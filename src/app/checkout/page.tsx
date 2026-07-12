import Link from "next/link";
import { createOrder } from "./actions";
export const metadata = {
  title: "Checkout | Vanguard Business Services",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-xl bg-white p-8 shadow">

          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-600">
            Complete your order securely.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            <div className="lg:col-span-2 rounded-lg border p-6">
              <h2 className="text-2xl font-semibold">
                Customer Information
              </h2>

             <form
  action={createOrder}
  className="mt-6 space-y-5"
>

  <div>
    <label className="mb-2 block font-medium">
      Full Name
    </label>

    <input
      type="text"
      name="full_name"
      required
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Email
    </label>

    <input
      type="email"
      name="email"
      required
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      WhatsApp Number
    </label>

    <input
      type="text"
      name="whatsapp"
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Country
    </label>

    <input
      type="text"
      name="country"
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>

  <div>
    <label className="mb-2 block font-medium">
      Company Name
    </label>

    <input
      type="text"
      name="company_name"
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>
<div>
  <label className="mb-2 block font-medium">
    Order Notes
  </label>

  <textarea
    name="order_notes"
    rows={4}
    placeholder="Additional information about your order..."
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Payment Method
  </label>

  <select
    name="payment_method"
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  >
    <option value="crypto">Cryptocurrency</option>
    <option value="bank">Bank Transfer</option>
    <option value="paypal">PayPal</option>
  </select>
</div>

<button
  type="submit"
  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
>
  Place Order
</button>
</form>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-2xl font-semibold">
                Order Summary
              </h2>

              <p className="mt-2 text-gray-500">
                Your selected services will appear here.
              </p>

              <Link
                href="/cart"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
              >
                Back to Cart
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}