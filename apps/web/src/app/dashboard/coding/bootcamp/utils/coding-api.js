const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

export async function createCodingRoom(name) {
  return request("/meetings/create", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
}

export async function joinCodingRoom(code, password) {
  return request("/meetings/join", {
    method: "POST",
    body: JSON.stringify({
      code: code.trim().toUpperCase(),
      password,
    }),
  });
}

export async function getCodingRoom(code) {
  return request(
    `/meetings/${encodeURIComponent(code.trim().toUpperCase())}`
  );
}

export async function checkServerHealth() {
  return request("/health");
}