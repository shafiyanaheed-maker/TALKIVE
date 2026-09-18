const STORAGE_KEY =
  "talkive-business-meeting";

export function saveMeeting(meeting) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        code: meeting.code,
        name:
          meeting.name ||
          "Business Meeting",
      })
    );
  } catch (error) {
    console.error(
      "Unable to save meeting:",
      error
    );
  }
}

export function getStoredMeeting() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      "Unable to read meeting:",
      error
    );

    return null;
  }
}

export function clearMeeting() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch (error) {
    console.error(
      "Unable to clear meeting:",
      error
    );
  }
}