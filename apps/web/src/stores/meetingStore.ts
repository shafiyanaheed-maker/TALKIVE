import { create } from "zustand";
import type {
  MeetingDetails,
  MeetingParticipant,
  MeetingMode,
  RoomLayout,
  ChatMessagePayload,
  CaptionChunk,
  Poll,
} from "@talkive/types";

export type SidePanelType =
  | "none"
  | "chat"
  | "participants"
  | "dual_editor"
  | "whiteboard"
  | "polls"
  | "ai_copilot"
  | "proctoring";

interface MeetingState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  // Room details
  meeting: MeetingDetails | null;
  currentUser: MeetingParticipant | null;
  remoteParticipants: Map<string, MeetingParticipant>;

  // Media toggles
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;

  // Layout & Navigation
  mode: MeetingMode;
  layout: RoomLayout;
  activeSidePanel: SidePanelType;
  spotlightParticipantId: string | null;

  // Real-time feeds
  chatMessages: ChatMessagePayload[];
  activeCaptions: CaptionChunk[];
  polls: Poll[];

  // Actions
  setConnectionState: (connecting: boolean, connected: boolean, error?: string | null) => void;
  setMeeting: (meeting: MeetingDetails, currentUser: MeetingParticipant) => void;
  updateRemoteParticipant: (participant: MeetingParticipant) => void;
  removeRemoteParticipant: (participantId: string) => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  toggleHandRaise: () => void;
  setLayout: (layout: RoomLayout) => void;
  setSidePanel: (panel: SidePanelType) => void;
  addChatMessage: (msg: ChatMessagePayload) => void;
  addCaption: (caption: CaptionChunk) => void;
  setPolls: (polls: Poll[]) => void;
  reset: () => void;
}

export const useMeetingStore = create<MeetingState>((set, get) => ({
  isConnected: false,
  isConnecting: false,
  error: null,

  meeting: null,
  currentUser: null,
  remoteParticipants: new Map(),

  isAudioMuted: false,
  isVideoMuted: false,
  isScreenSharing: false,
  isHandRaised: false,

  mode: "general",
  layout: "grid",
  activeSidePanel: "none",
  spotlightParticipantId: null,

  chatMessages: [],
  activeCaptions: [],
  polls: [],

  setConnectionState: (connecting, connected, error = null) =>
    set({ isConnecting: connecting, isConnected: connected, error }),

  setMeeting: (meeting, currentUser) =>
    set({
      meeting,
      currentUser,
      mode: meeting.mode,
      isAudioMuted: currentUser.isAudioMuted,
      isVideoMuted: currentUser.isVideoMuted,
    }),

  updateRemoteParticipant: (participant) => {
    set((state) => {
      const next = new Map(state.remoteParticipants);
      next.set(participant.id, participant);
      return { remoteParticipants: next };
    });
  },

  removeRemoteParticipant: (participantId) => {
    set((state) => {
      const next = new Map(state.remoteParticipants);
      next.delete(participantId);
      return { remoteParticipants: next };
    });
  },

  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
  toggleVideo: () => set((state) => ({ isVideoMuted: !state.isVideoMuted })),
  toggleScreenShare: () => set((state) => ({ isScreenSharing: !state.isScreenSharing })),
  toggleHandRaise: () => set((state) => ({ isHandRaised: !state.isHandRaised })),

  setLayout: (layout) => set({ layout }),
  setSidePanel: (panel) =>
    set((state) => ({
      activeSidePanel: state.activeSidePanel === panel ? "none" : panel,
    })),

  addChatMessage: (msg) =>
    set((state) => ({ chatMessages: [...state.chatMessages, msg] })),

  addCaption: (caption) =>
    set((state) => ({
      activeCaptions: [...state.activeCaptions.slice(-4), caption],
    })),

  setPolls: (polls) => set({ polls }),

  reset: () =>
    set({
      isConnected: false,
      isConnecting: false,
      error: null,
      meeting: null,
      currentUser: null,
      remoteParticipants: new Map(),
      isAudioMuted: false,
      isVideoMuted: false,
      isScreenSharing: false,
      isHandRaised: false,
      chatMessages: [],
      activeCaptions: [],
      activeSidePanel: "none",
    }),
}));
