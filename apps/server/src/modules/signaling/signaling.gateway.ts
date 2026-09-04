import type { WebSocket } from "ws";
import type { SocketEnvelope, SocketTopic } from "@talkive/types";
import { redis, redisSub } from "./redis.js";

interface ConnectedClient {
  socket: WebSocket;
  participantId: string;
  displayName: string;
  roomId: string;
  isGhost: boolean;
}

export class SignalingGateway {
  // roomId -> Map<participantId, ConnectedClient>
  private static rooms = new Map<string, Map<string, ConnectedClient>>();

  static initialize() {
    // Subscribe to Redis pub/sub for multi-node horizontal scaling
    try {
      redisSub.subscribe("talkive:signaling", (err) => {
        if (err) {
          console.warn("⚠️ Signaling Redis PubSub subscription failed:", err.message);
        } else {
          console.log("📡 Real-Time Signaling Redis PubSub cluster initialized");
        }
      });

      redisSub.on("message", (_channel, message) => {
        try {
          const envelope: SocketEnvelope = JSON.parse(message);
          this.broadcastLocal(envelope);
        } catch {
          // ignore malformed message
        }
      });
    } catch (err: any) {
      console.warn("⚠️ Redis PubSub init deferred:", err.message);
    }
  }

  static handleConnection(socket: WebSocket) {
    let currentClient: ConnectedClient | null = null;

    socket.on("message", async (raw: string | Buffer) => {
      try {
        const envelope: SocketEnvelope = JSON.parse(raw.toString());

        switch (envelope.topic) {
          case "room:join": {
            const { roomId, participantId, displayName, isGhost } = envelope.payload as {
              roomId: string;
              participantId: string;
              displayName: string;
              isGhost?: boolean;
            };

            currentClient = {
              socket,
              participantId,
              displayName,
              roomId,
              isGhost: Boolean(isGhost),
            };

            if (!this.rooms.has(roomId)) {
              this.rooms.set(roomId, new Map());
            }
            this.rooms.get(roomId)!.set(participantId, currentClient);

            // Notify joining client of success
            this.sendToClient(socket, {
              id: envelope.id,
              topic: "room:joined",
              roomId,
              senderId: "system",
              timestamp: Date.now(),
              payload: {
                roomId,
                participants: this.getPublicParticipants(roomId),
              },
            });

            // If NOT a ghost, broadcast to other room participants
            if (!currentClient.isGhost) {
              this.publishEnvelope({
                id: envelope.id,
                topic: "room:participant_joined",
                roomId,
                senderId: participantId,
                timestamp: Date.now(),
                payload: {
                  participantId,
                  displayName,
                },
              });
            }
            break;
          }

          case "ping": {
            this.sendToClient(socket, {
              id: envelope.id,
              topic: "pong",
              roomId: envelope.roomId,
              senderId: "system",
              timestamp: Date.now(),
              payload: {},
            });
            break;
          }

          case "chat:send":
          case "media:state_changed":
          case "media:hand_raise":
          case "media:hand_lower":
          case "media:mute_all":
          case "collab:cursor_move":
          case "poll:create":
          case "poll:vote":
          case "proctor:event": {
            // Forward event across cluster
            this.publishEnvelope(envelope);
            break;
          }

          default:
            this.publishEnvelope(envelope);
        }
      } catch (err) {
        console.error("Signaling message handling error:", err);
      }
    });

    socket.on("close", () => {
      if (currentClient) {
        const { roomId, participantId, isGhost, displayName } = currentClient;
        const room = this.rooms.get(roomId);
        if (room) {
          room.delete(participantId);
          if (room.size === 0) {
            this.rooms.delete(roomId);
          }
        }

        // If NOT a ghost, notify others of departure
        if (!isGhost) {
          this.publishEnvelope({
            id: `leave_${Date.now()}`,
            topic: "room:participant_left",
            roomId,
            senderId: participantId,
            timestamp: Date.now(),
            payload: { participantId, displayName },
          });
        }
      }
    });
  }

  private static publishEnvelope(envelope: SocketEnvelope) {
    // Deliver locally
    this.broadcastLocal(envelope);

    // Broadcast to Redis cluster
    try {
      redis.publish("talkive:signaling", JSON.stringify(envelope)).catch(() => {});
    } catch {
      // ignore
    }
  }

  private static broadcastLocal(envelope: SocketEnvelope) {
    const room = this.rooms.get(envelope.roomId);
    if (!room) return;

    const data = JSON.stringify(envelope);

    for (const [participantId, client] of room.entries()) {
      // Don't echo back to sender unless it's a specific synchronized state topic
      if (participantId === envelope.senderId && envelope.topic !== "collab:cursor_move") {
        continue;
      }

      if (client.socket.readyState === client.socket.OPEN) {
        client.socket.send(data);
      }
    }
  }

  private static sendToClient(socket: WebSocket, envelope: SocketEnvelope) {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(envelope));
    }
  }

  private static getPublicParticipants(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    // Filter out Ghost participants to keep them invisible!
    const publicList: Array<{ participantId: string; displayName: string }> = [];
    for (const client of room.values()) {
      if (!client.isGhost) {
        publicList.push({
          participantId: client.participantId,
          displayName: client.displayName,
        });
      }
    }
    return publicList;
  }
}
