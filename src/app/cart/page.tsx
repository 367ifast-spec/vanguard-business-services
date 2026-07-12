import { getCartItems } from "./actions";

export const metadata = {
  title: "Shopping Cart | Vanguard Business Services",
};

export default async function CartPage() {
  // পরে আমরা session/cookie থেকে sessionId নেব
  const sessionId = "demo-session";

  const items = await getCartItems(sessionId);

  const total = items.reduce((sum: number, item: any) => {
    const service = Array.isArray(item.services)
      ? item.services[0]
      : item.services;

    return sum + (Number(service?.price ?? 0) * item.quantity);
  }, 0);

  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        <p className="mt-3 text-gray-400">
          Review your selected services before checkout.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-4 text-gray-400">
              Add services to your cart to continue.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-6">
              {items.map((item: any) => {
                const service = Array.isArray(item.services)
                  ? item.services[0]
                  : item.services;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {service?.title}
                        </h2>

                        <p className="mt-2 text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-400">
                          ${Number(service?.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-blue-600 bg-blue-600/10 p-8">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  Total
                </span>

                <span className="text-3xl font-bold text-blue-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}