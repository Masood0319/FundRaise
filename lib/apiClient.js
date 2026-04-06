// lib/apiClient.js

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function toApiUrl(route) {
  const normalizedRoute = String(route || "").replace(/^\/+/, "");
  const normalizedBase = String(API_BASE).replace(/\/+$/, "");
  const baseWithApi = /\/api$/i.test(normalizedBase)
    ? normalizedBase
    : `${normalizedBase}/api`;
  return `${baseWithApi}/${normalizedRoute}`;
}

function createApiError(response, payload) {
  const message =
    payload?.message ||
    payload?.error ||
    (response?.status ? `Request failed (${response.status})` : "Request failed");
  const error = new Error(message);
  error.status = response?.status || 0;
  error.payload = payload || null;
  return error;
}

function handleUnauthorized(responseStatus) {
  if (typeof window === "undefined") return;

  if (responseStatus !== 401) return;

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    localStorage.removeItem("token");
  } catch (_) {}

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

// Main API request function
export async function apiRequest(route, options = {}) {
  const {
    method = "GET",
    data,
    headers = {},
    credentials = "include",
    cache,
    signal,
  } = options;

  // ✅ Get JWT token from localStorage
  const token = localStorage.getItem("token");

  const upperMethod = method.toUpperCase();
  const init = {
    method: upperMethod,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // automatically include token
    },
  };

  if (cache) init.cache = cache;
  if (signal) init.signal = signal;

  if (upperMethod !== "GET" && upperMethod !== "HEAD") {
    init.body = JSON.stringify(data || {});
  }

  const response = await fetch(toApiUrl(route), init);
  const payload = await response.json().catch(() => null);

  handleUnauthorized(response.status);

  if (!response.ok || !payload?.success) {
    throw createApiError(response, payload);
  }

  return payload;
}

// Raw API request function (for special cases)
export async function apiRequestRaw(route, options = {}) {
  const {
    method = "GET",
    headers = {},
    credentials = "include",
    cache,
    signal,
    body,
  } = options;

  const token = localStorage.getItem("token");

  const upperMethod = method.toUpperCase();
  const response = await fetch(toApiUrl(route), {
    method: upperMethod,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(cache ? { cache } : {}),
    ...(signal ? { signal } : {}),
    ...(upperMethod !== "GET" && upperMethod !== "HEAD" && body !== undefined
      ? { body }
      : {}),
  });

  const payload = await response.json().catch(() => null);
  handleUnauthorized(response.status);
  if (!response.ok || !payload?.success) {
    throw createApiError(response, payload);
  }

  return payload;
}
