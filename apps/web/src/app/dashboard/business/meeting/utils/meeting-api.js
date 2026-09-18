const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

export async function createBusinessMeeting(
  name
) {
  const response = await fetch(
    `${API_URL}/meetings/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to create meeting."
    );
  }

  return data;
}

export async function joinBusinessMeeting(
  code,
  password
) {
  const response = await fetch(
    `${API_URL}/meetings/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        password,
      }),
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to join meeting."
    );
  }

  return data;
}

export async function getBusinessMeeting(
  code
) {
  const response = await fetch(
    `${API_URL}/meetings/${encodeURIComponent(
      code
    )}`
  );

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Meeting not found."
    );
  }

  return data;
}