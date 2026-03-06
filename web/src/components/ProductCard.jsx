export default function ProductCard({ p, onMoreInfo }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-slate-100">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
        <p className="text-slate-700">{Number(p.price ?? 0).toFixed(0)} kr</p>
        {p.description ? (
          <p className="text-sm text-slate-600">{p.description}</p>
        ) : null}
        <button
          type="button"
          onClick={onMoreInfo}
          className="mt-2 w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:opacity-90"
        >
          Mer Info
        </button>
      </div>
    </article>
  );
}
