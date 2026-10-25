export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`${endpoint} failed with HTTP ${response.status}`);
  }

  return response.json();
}

export function checkBackendHealth() {
  return request("/health");
}

export function fetchDataSummary() {
  return request("/data-summary");
}

export function fetchDriftCheck() {
  return request("/drift-check");
}

export function fetchAllocationResults() {
  return request("/allocation-results");
}
