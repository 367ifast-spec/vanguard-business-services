import { redirect } from "next/navigation";
import PaymentButton from "@/components/PaymentButton";
import { supabaseAdmin } from "@/lib/supabase";

interface PaymentPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export const metadata = {
  title: "Payment | Vanguard Business Services",
};

export default async function PaymentPage({
  searchParams,
}: PaymentPageProps) {

  const params = await searchParams;


  if (!params.order) {
    redirect("/checkout");
  }


  let order = null;


  if (supabaseAdmin) {

    const {
      data,
    } = await supabaseAdmin
      .from("orders")
      .select(
        `
          id,
          total_amount,
          payment_status,
          status,
          customer_name,
          customer_email
        `
      )
      .eq(
        "id",
        params.order
      )
      .single();


    order = data;
  }


  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">

      <div className="mx-auto max-w-4xl space-y-8">


        {/* Header */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Secure Payment
          </span>


          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Complete Your Payment
          </h1>


          <p className="mt-3 text-slate-600">
            Your order is ready. Complete payment securely using our payment gateway.
          </p>

        </section>



        <div className="grid gap-8 lg:grid-cols-3">


          {/* Payment Card */}

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">


            <h2 className="text-2xl font-bold text-slate-900">
              Crypto Payment
            </h2>


            <p className="mt-3 text-slate-600">
              Generate a secure cryptocurrency invoice through NOWPayments.
            </p>


            <div className="mt-8">

              <PaymentButton
                orderId={params.order}
              />

            </div>


          </section>
                    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Order Details
            </h2>


            <div className="mt-6 space-y-4">


              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-medium text-slate-500">
                  Order ID
                </p>

                <p className="mt-1 break-all font-semibold text-slate-900">
                  {params.order}
                </p>

              </div>



              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-medium text-slate-500">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {order?.customer_name ?? "Customer"}
                </p>

              </div>



              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-medium text-slate-500">
                  Amount
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-700">
                  ${order?.total_amount ?? 0}
                </p>

              </div>



              <div className="rounded-xl bg-green-50 p-4">

                <p className="text-sm font-medium text-green-700">
                  Payment Status
                </p>

                <p className="mt-1 font-semibold text-green-800">
                  {order?.payment_status ?? "Pending"}
                </p>

              </div>


            </div>


          </section>


        </div>



        {/* Security Information */}

        <section className="rounded-3xl border border-blue-200 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Secure Payment Protection
          </h2>


          <div className="mt-4 grid gap-4 md:grid-cols-3">


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="font-semibold text-slate-900">
                🔒 Secure Gateway
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Payments are processed through trusted providers.
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="font-semibold text-slate-900">
                ⚡ Fast Processing
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Payment confirmation updates automatically.
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="font-semibold text-slate-900">
                🌎 Global Support
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Business services available worldwide.
              </p>

            </div>


          </div>

        </section>


      </div>

    </main>
  );
}