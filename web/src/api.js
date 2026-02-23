const API_BASE = "http://localhost:4000";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}