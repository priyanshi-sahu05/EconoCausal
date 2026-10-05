const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(endpoint, errorMessage) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export function checkBackendHealth() {
  return request("/health", "Backend health check failed");
}

export function fetchPredictions() {
  return request("/predict", "Failed to fetch predictions");
}

export function fetchAllocationResults() {
  return request("/allocation", "Failed to fetch allocation results");
}

export { API_BASE_URL };