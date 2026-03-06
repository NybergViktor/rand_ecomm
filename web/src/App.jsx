import { useEffect, useState } from "react";
import { getProductsCityAll } from "./api.js";
import CartView from "./components/CartView.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import { loadCart, saveCart } from "./utils/cartStorage.js";

export default function App() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeView, setActiveView] = useState("products");
  const [cartItems, setCartItems] = useState(() => loadCart());

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const selectedProduct =
    items.find((p) => p._id === selectedProductId) ?? null;

  const isCartView = activeView === "cart";

  function handleAddToCart(product, selectedColor) {
    const color = selectedColor || "Default";

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product._id && item.selectedColor === color,
      );

      if (existingIndex === -1) {
        return [
          ...prev,
          {
            productId: product._id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }

      const next = [...prev];
      next[existingIndex] = {
        ...next[existingIndex],
        quantity: (next[existingIndex].quantity ?? 0) + 1,
      };
      return next;
    });
  }

  function handleIncreaseQuantity(productId, selectedColor) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: Number(item.quantity ?? 0) + 1 }
          : item,
      ),
    );
  }

  function handleDecreaseQuantity(productId, selectedColor) {
    setCartItems((prev) => {
      const next = prev
        .map((item) =>
          item.productId === productId && item.selectedColor === selectedColor
            ? { ...item, quantity: Number(item.quantity ?? 0) - 1 }
            : item,
        )
        .filter((item) => Number(item.quantity ?? 0) > 0);
      return next;
    });
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getProductsCityAll();
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
          <button
            type="button"
            onClick={() => {
              setSelectedProductId(null);
              setActiveView("products");
            }}
            className="text-xl font-bold text-slate-900"
          >
            Studio Poster
          </button>
          <button
            type="button"
            onClick={() => setActiveView("cart")}
            className="text-sm text-slate-700 underline underline-offset-2"
          >
            Kundvagn ({cartCount})
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {status === "loading" ? (
          <p className="text-slate-700">Laddar...</p>
        ) : status === "error" ? (
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-900">
              Kunde ej ladda produkter...
            </p>
            <p className="text-slate-700 mt-2 text-sm">
              Check backend and CORS.
            </p>
          </div>
        ) : isCartView ? (
          <CartView
            cartItems={cartItems}
            onBack={() => setActiveView("products")}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        ) : items.length === 0 ? (
          <p className="text-slate-700">Inga produkter..</p>
        ) : selectedProduct ? (
          <ProductDetail
            p={selectedProduct}
            onBack={() => {
              setSelectedProductId(null);
              setActiveView("products");
            }}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-slate-900">Posters</h2>
            <br/>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard
                  key={p._id}
                  p={p}
                  onMoreInfo={() => {
                    setSelectedProductId(p._id);
                    setActiveView("product");
                  }}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
