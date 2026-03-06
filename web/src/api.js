const API_BASE = "http://localhost:4000";

export async function getProductsCityAll() {
  const res = await fetch(`${API_BASE}/api/products/cities/all`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
