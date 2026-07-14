import Link from "next/link";
import { createOrder } from "./actions";
import { getCartItems } from "@/app/cart/actions";

export const metadata = {
  title: "Checkout | Vanguard Business Services",
};

export default async function CheckoutPage() {
  const cartItems = await getCartItems();

  const totalAmount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.services?.[0]?.price ?? 0) *
          Number(item.quantity ?? 0),
      0
    );

  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Secure Checkout
              </span>

              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Complete Your Order
              </h1>

              <p className="mt-3 text-slate-600">
                Provide your information and confirm your business service order.
              </p>
            </div>

            <Link
              href="/cart"
              className="rounded-xl bg-slate-900 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              Back To Cart
            </Link>

          </div>

        </section>


        <div className="grid gap-8 lg:grid-cols-3">

          {/* Customer Form */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">

            <h2 className="text-2xl font-bold text-slate-900">
              Customer Information
            </h2>

            <p className="mt-2 text-slate-500">
              Enter your details for order processing.
            </p>


            <form
              action={createOrder}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  required
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

              <input
  type="email"
  name="email"
  required
  autoComplete="email"
  spellCheck={false}
  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 caret-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
  style={{
    color: "#0f172a",
    backgroundColor: "#ffffff",
  }}
/>
              </div>


              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    WhatsApp Number
                  </label>

                  <input
                    type="text"
                    name="whatsapp"
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"                  />
                </div>

              </div>
                            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company Name
                </label>

                <input
                  type="text"
                  name="company_name"
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Order Notes
                </label>

                <textarea
                  name="order_notes"
                  rows={4}
                  placeholder="Additional information about your order..."
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Payment Method
                </label>

                <select
                  name="payment_method"
className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"                >
                  <option value="crypto">
                    Cryptocurrency
                  </option>

                  <option value="bank">
                    Bank Transfer
                  </option>

                  <option value="paypal">
                    PayPal
                  </option>
                </select>
              </div>


              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Place Order
              </button>

            </form>

          </section>


          {/* Order Summary */}

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>


            <div className="mt-6 space-y-4">

              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >

                    <p className="font-semibold text-slate-900">
                      {item.services?.[0]?.title}
                    </p>


                    <div className="mt-2 flex items-center justify-between text-sm text-slate-500">

                      <span>
                        Qty: {item.quantity}
                      </span>

                      <span>
                        $
                        {Number(
                          item.services?.[0]?.price ?? 0
                        ) *
                          Number(item.quantity ?? 0)}
                      </span>

                    </div>

                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  Your cart is empty.
                </p>
              )}

            </div>


            <div className="mt-8 border-t border-slate-200 pt-6">

              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Total Amount
              </p>


              <h3 className="mt-3 text-4xl font-bold text-blue-700">
                ${totalAmount}
              </h3>

            </div>


            <Link
              href="/cart"
              className="mt-6 block rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Edit Cart
            </Link>

          </section>

        </div>

      </div>
    </main>
  );
}