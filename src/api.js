// src/api.js
export async function fetchIpDetails(searchTerm = '', paramType = 'ipAddress') {
    const queryParam = searchTerm ? `?${paramType}=${encodeURIComponent(searchTerm)}` : '';
    const response = await fetch(`/api/lookup${queryParam}`);

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json();
}
