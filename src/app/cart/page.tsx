import Link from "next/link";
import {
  getCartItems,
} from "./actions";

export const metadata = {
  title: "Shopping Cart | Vanguard Business Services",
};

export default async function CartPage() {
  const cartItems = await getCartItems();

 const totalAmount =
  cartItems?.reduce((total, item) => {
    const service = Array.isArray(item.services)
      ? item.services[0]
      : (item.services as { price?: number } | null);

    return (
      total +
      Number(service?.price ?? 0) *
        Number(item.quantity ?? 0)
    );
  }, 0) ?? 0;

  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Vanguard Cart
              </span>

              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Your Shopping Cart
              </h1>

              <p className="mt-3 text-slate-600">
                Review selected business services before checkout.
              </p>
            </div>
<Link
  href="/#services"
  className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
>
  Continue Shopping
</Link>
          </div>
        </section>

        {cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Cart Items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Selected services and pricing details.
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                        Quantity
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    
                    {cartItems.map((item) => (
                    <tr
  key={item.id}
  className="border-b border-slate-100"
>
  {/* Service */}
 <td className="px-6 py-5 font-semibold text-slate-900">
${
  (
    Array.isArray(item.services)
      ? item.services[0]
      : (item.services as { price?: number } | null)
  )?.price ?? 0
}
</td>
<td className="px-6 py-5 font-semibold text-slate-900">
${
  (
    Array.isArray(item.services)
      ? item.services[0]
      : (item.services as { price?: number } | null)
  )?.price ?? 0
}
</td>
  {/* Quantity */}
  <td className="px-6 py-5">
    <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
      {item.quantity}
    </span>
  </td>

  {/* Total */}
  <td className="px-6 py-5">
    <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
      $
     {
  Number(
    (
      Array.isArray(item.services)
        ? item.services[0]
        : (item.services as { price?: number } | null)
    )?.price ?? 0
  ) * Number(item.quantity ?? 0)
}
    </span>
  </td>

  {/* Action */}
  <td className="px-6 py-5">
    <Link
      href={`/checkout?item=${item.id}`}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Checkout
    </Link>
  </td>
</tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </section>


            {/* Summary */}
            <section className="grid gap-6 lg:grid-cols-3">

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <p className="mt-3 text-slate-600">
                  Your selected business services are ready for checkout.
                </p>
              </div>


              <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">

                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Total Amount
                </p>

                <h2 className="mt-3 text-4xl font-bold text-blue-700">
                  ${totalAmount}
                </h2>


                <Link
                  href="/checkout"
                  className="mt-6 block rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Proceed To Checkout
                </Link>

              </div>

            </section>

          </>
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-5xl">
              🛒
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Your Cart Is Empty
            </h2>

            <p className="mt-3 text-slate-500">
              Add business services to your cart and continue your order.
            </p>

           <Link
  href="/#services"
  className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  Browse Services
</Link>

          </section>
        )}

      </div>
    </main>
  );
}
