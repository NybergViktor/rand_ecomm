import { useEffect, useState } from "react";
import { getProducts } from "./api.js";

function ProductCard({ p }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-slate-100">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
        <p className="text-slate-700">{Number(p.price ?? 0).toFixed(0)} kr</p>
        {p.description ? <p className="text-sm text-slate-600">{p.description}</p> : null}
        <button className="mt-2 w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:opacity-90">
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getProducts();
        if (!alive) return;
        setItems(data.items ?? []);
        setStatus("ok");
      } catch {
        if (!alive) return;
        setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">My Store</h1>
          <div className="text-sm text-slate-700">Cart (0)</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
        <p className="text-slate-600 text-sm mt-1 mb-6">Loaded from your API</p>

        {status === "loading" ? (
          <p className="text-slate-700">Loading...</p>
        ) : status === "error" ? (
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-900">Could not load products</p>
            <p className="text-slate-700 mt-2 text-sm">
              Check that backend runs on http://localhost:4000 and CORS is enabled.
            </p>
          </div>
        ) : items.length === 0 ? (
          <p className="text-slate-700">No products yet.</p>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}