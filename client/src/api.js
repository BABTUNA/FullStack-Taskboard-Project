const baseUrl = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('taskboard-token');
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }), ...options.headers },
  });
  if (!response.ok) throw new Error((await response.json()).error || 'Request failed');
  return response.status === 204 ? null : response.json();
}
