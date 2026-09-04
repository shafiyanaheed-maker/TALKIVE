import type {
  CreateMeetingRequest,
  JoinMeetingRequest,
  JoinMeetingResponse,
  MeetingDetails,
} from "@talkive/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export class TalkiveApiClient {
  static async createMeeting(data: CreateMeetingRequest, token?: string): Promise<MeetingDetails> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api/v1/meetings`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || "Failed to create meeting");
    }

    return json.data;
  }

  static async getMeeting(code: string): Promise<MeetingDetails> {
    const res = await fetch(`${API_BASE}/api/v1/meetings/${code}`, {
      method: "GET",
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || "Meeting not found");
    }

    return json.data;
  }

  static async joinMeeting(
    code: string,
    data: JoinMeetingRequest,
    token?: string
  ): Promise<JoinMeetingResponse> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api/v1/meetings/${code}/join`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || "Failed to join meeting");
    }

    return json.data;
  }
}
