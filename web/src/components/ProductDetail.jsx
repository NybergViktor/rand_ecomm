import { useEffect, useState } from "react";

export default function ProductDetail({ p, onBack, onAddToCart }) {
  const colors = Array.isArray(p.frameColor) ? p.frameColor : [];
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "");

  useEffect(() => {
    setSelectedColor(colors[0] ?? "");
  }, [p._id]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-100">
          {p.imageUrl ? (
            <img
              src={p.imageUrl}
              alt={p.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="p-6 space-y-4">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-slate-700 underline underline-offset-2"
          >
            ← Tillbaka till produkter
          </button>

          <h2 className="text-2xl font-semibold text-slate-900">{p.title}</h2>
          <p className="text-xl font-medium text-slate-900">
            {Number(p.price ?? 0).toFixed(0)} kr
          </p>

          {p.description ? (
            <p className="text-sm text-slate-700">{p.description}</p>
          ) : null}

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">Color</p>
            {colors.length > 0 ? (
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-slate-600">
                Inga färger tillgängliga.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(p, selectedColor)}
            className="w-full rounded-xl bg-slate-900 text-white py-2.5 text-sm font-medium hover:opacity-90"
          >
            Lägg till i kundvagn
          </button>
        </div>
      </div>
    </section>
  );
}
