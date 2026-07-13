import Link from "next/link";

import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

import { supabaseAdmin } from "@/lib/supabase";


export const metadata = {
  title: "Order Details | Admin Dashboard",
};



export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } =
    await params;



  if (!supabaseAdmin) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">

          <p className="font-semibold text-red-600">
            Supabase is not configured.
          </p>

        </div>

      </main>

    );

  }



  const {
    data: order,
    error,
  } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .eq(
        "id",
        id
      )
      .single();



  if (
    error ||
    !order
  ) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">

          <p className="font-semibold text-red-600">
            Order not found.
          </p>

        </div>

      </main>

    );

  }



  const {
    data: items,
    error: itemsError,
  } =
    await supabaseAdmin
      .from("order_items")
      .select("*")
      .eq(
        "order_id",
        id
      );



  if (itemsError) {

    throw new Error(
      itemsError.message
    );

  }



  const {
    data: payment,
  } =
    await supabaseAdmin
      .from("payments")
      .select("*")
      .eq(
        "order_id",
        id
      )
      .maybeSingle();



  return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">

      <div className="mx-auto max-w-7xl space-y-8">



        {/* Header */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Enterprise Order Management
              </span>


              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Order Details
              </h1>


              <p className="mt-3 text-slate-600">
                Manage customer details, services, payment and order status.
              </p>

            </div>



            <Link
              href="/admin/orders"
              className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-100"
            >
              ← Back Orders
            </Link>


          </div>

        </section>
                {/* Customer & Order Information */}

        <section className="grid gap-8 xl:grid-cols-2">


          {/* Customer Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Customer Information
            </h2>


            <div className="mt-6 space-y-4">


              <div>

                <p className="text-sm text-slate-500">
                  Name
                </p>

                <p className="font-semibold text-slate-900">
                  {order.customer_name}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold text-slate-900">
                  {order.customer_email}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  WhatsApp
                </p>

                <p className="font-semibold text-slate-900">
                  {order.customer_whatsapp ?? "-"}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Country
                </p>

                <p className="font-semibold text-slate-900">
                  {order.customer_country ?? "-"}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Company
                </p>

                <p className="font-semibold text-slate-900">
                  {order.company_name ?? "-"}
                </p>

              </div>


            </div>

          </div>




          {/* Order Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


            <h2 className="text-2xl font-bold text-slate-900">
              Order Information
            </h2>



            <div className="mt-6 space-y-5">


              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Status
                </span>


                <OrderStatusBadge
                  status={order.status}
                />

              </div>



              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Payment
                </span>


                <PaymentStatusBadge
                  status={order.payment_status}
                />

              </div>



              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Method
                </span>


                <span className="font-semibold text-slate-900">
                  {order.payment_method}
                </span>

              </div>



              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Total Amount
                </span>


                <span className="text-2xl font-bold text-blue-700">
                  ${Number(order.total_amount ?? 0).toFixed(2)}
                </span>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Created At
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>

              </div>


            </div>


          </div>


        </section>




        {/* Ordered Services */}


        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-8 py-6">


            <h2 className="text-2xl font-bold text-slate-900">
              Ordered Services
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Services included in this customer order.
            </p>


          </div>



          <div className="overflow-x-auto">


            {items && items.length > 0 ? (

              <table className="min-w-full">


                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Service
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Quantity
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Unit Price
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Total
                    </th>

                  </tr>

                </thead>



                <tbody>

                  {items.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >

                      <td className="px-6 py-5 font-semibold text-slate-900">
                        {item.service_title}
                      </td>


                      <td className="px-6 py-5">
                        {item.quantity}
                      </td>


                      <td className="px-6 py-5">
                        ${Number(
                          item.unit_price ?? 0
                        ).toFixed(2)}
                      </td>


                      <td className="px-6 py-5 font-semibold">
                        ${Number(
                          item.total_price ?? 0
                        ).toFixed(2)}
                      </td>


                    </tr>

                  ))}

                </tbody>


              </table>

            ) : (

              <p className="p-8 text-slate-500">
                No services found.
              </p>

            )}


          </div>


        </section>
                {/* Status Update & Payment Information */}

        <section className="grid gap-8 xl:grid-cols-2">


          {/* Status Update */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


            <h2 className="text-2xl font-bold text-slate-900">
              Update Order Status
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Change order progress and payment status.
            </p>



            <div className="mt-6">

              <OrderStatusForm
                orderId={order.id}
                status={order.status}
                paymentStatus={
                  order.payment_status
                }
              />

            </div>


          </div>




          {/* Payment Information */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


            <h2 className="text-2xl font-bold text-slate-900">
              Payment Information
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Payment details connected with this order.
            </p>



            {payment ? (

              <div className="mt-6 space-y-5">


                <div>

                  <p className="text-sm text-slate-500">
                    Payment ID
                  </p>

                  <p className="break-all font-semibold text-slate-900">
                    {payment.payment_id ?? "-"}
                  </p>

                </div>



                <div>

                  <p className="text-sm text-slate-500">
                    Invoice
                  </p>


                  {payment.invoice_url ? (

                    <a
                      href={payment.invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Open Invoice
                    </a>

                  ) : (

                    <p className="font-semibold text-slate-900">
                      -
                    </p>

                  )}


                </div>



                <div className="grid gap-5 md:grid-cols-2">


                  <div>

                    <p className="text-sm text-slate-500">
                      Pay Amount
                    </p>

                    <p className="font-semibold text-slate-900">
                      {payment.pay_amount ?? "-"}{" "}
                      {payment.pay_currency ?? ""}
                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-slate-500">
                      Actually Paid
                    </p>

                    <p className="font-semibold text-slate-900">
                      {payment.actually_paid ?? "-"}
                    </p>

                  </div>


                </div>



                <div>

                  <p className="text-sm text-slate-500">
                    Payment Status
                  </p>


                  <div className="mt-2">

                    <PaymentStatusBadge
                      status={
                        payment.payment_status
                      }
                    />

                  </div>

                </div>


              </div>


            ) : (

              <p className="mt-6 text-slate-500">
                No payment record found.
              </p>

            )}


          </div>


        </section>


      </div>

    </main>

  );

}
