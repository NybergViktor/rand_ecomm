export default function CartView({
  cartItems,
  onBack,
  onIncrease,
  onDecrease,
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-700 underline underline-offset-2"
        >
          ← Back to products
        </button>
        <h2 className="text-2xl font-semibold text-slate-900">Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-slate-700">Din kundvagn är tom.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={`${item.productId}-${item.selectedColor}`}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-700">
                      Färg på pappersram: {item.selectedColor}
                    </p>
                    <p className="text-sm text-slate-700">
                      Pris: {Number(item.price ?? 0).toFixed(0)} kr
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onDecrease(item.productId, item.selectedColor)
                        }
                        className="h-8 w-8 rounded-lg border border-slate-300 text-slate-900"
                      >
                        -
                      </button>
                      <span className="text-sm text-slate-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onIncrease(item.productId, item.selectedColor)
                        }
                        className="h-8 w-8 rounded-lg border border-slate-300 text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-900">
                    {Number(item.price ?? 0) * Number(item.quantity ?? 0)} kr
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            <p className="text-base font-semibold text-slate-900">Total</p>
            <p className="text-lg font-semibold text-slate-900">
              {Number(total).toFixed(0)} kr
            </p>
          </div>
        </>
      )}
    </section>
  );
}
