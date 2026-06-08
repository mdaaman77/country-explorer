import { API_CONFIG } from "./config.js";

export async function fetchCountries() {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}