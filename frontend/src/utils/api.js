const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json();
}

export async function fetchPredictions() {
  const response = await fetch(`${API_BASE_URL}/predict`);

  if (!response.ok) {
    throw new Error("Failed to fetch predictions");
  }

  return response.json();
}

export async function fetchAllocationResults() {
  const response = await fetch(`${API_BASE_URL}/allocation`);

  if (!response.ok) {
    throw new Error("Failed to fetch allocation results");
  }

  return response.json();
}

export { API_BASE_URL };