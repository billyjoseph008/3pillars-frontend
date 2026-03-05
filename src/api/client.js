const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  const body = hasJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      (body && (body.message || body.error)) ||
      `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return body;
}