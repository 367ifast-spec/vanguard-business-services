import { updateSetting } from "./actions";
import { supabaseAdmin } from "@/lib/supabase";


export const metadata = {
  title: "Settings | Admin Dashboard",
};



type Setting = {
  id: string;
  key: string;
  value: string | null;
};



export default async function SettingsPage() {


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



  const { data } =
    await supabaseAdmin
      .from("settings")
      .select("*")
      .order(
        "created_at",
        {
          ascending: true,
        }
      );



  const settings =
    (data ?? []) as Setting[];



  const getSetting = (
    key: string
  ) => {

    return (
      settings.find(
        (item) =>
          item.key === key
      )?.value ?? ""
    );

  };



  async function saveSetting(
    formData: FormData
  ) {

    "use server";


    const key =
      String(
        formData.get("key") ?? ""
      );


    const value =
      String(
        formData.get("value") ?? ""
      );



    await updateSetting(
      key,
      value
    );

  }



  return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">


      <div className="mx-auto max-w-7xl space-y-8">



        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Enterprise Control Panel
          </span>



          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            Website Settings
          </h1>



          <p className="mt-3 text-slate-600">
            Update business configuration from admin dashboard.
          </p>


        </section>



        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            Business Information
          </h2>



         <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form
  action={saveSetting}
  className="rounded-2xl bg-slate-50 p-5"
>


  <input
    type="hidden"
    name="key"
    value="business_name"
  />


  <label className="text-sm font-semibold text-slate-600">
    Business Name
  </label>


  <input
    name="value"
    defaultValue={
      getSetting(
        "business_name"
      )
    }
    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
  />


  <button
    type="submit"
    className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
  >
    Save Business Name
  </button>


</form>




<form
  action={saveSetting}
  className="rounded-2xl bg-slate-50 p-5"
>


  <input
    type="hidden"
    name="key"
    value="email"
  />


  <label className="text-sm font-semibold text-slate-600">
    Email
  </label>


  <input
    name="value"
    defaultValue={
      getSetting(
        "email"
      )
    }
    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
  />


  <button
    type="submit"
    className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
  >
    Save Email
  </button>


</form>


          </div>


        </section>




        {/* Contact Settings */}


        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            Contact Settings
          </h2>



          <div className="mt-6 grid gap-6 md:grid-cols-2">


            <form
              action={saveSetting}
              className="rounded-2xl bg-slate-50 p-5"
            >


              <input
                type="hidden"
                name="key"
                value="whatsapp"
              />


              <label className="text-sm font-semibold text-slate-600">
                WhatsApp
              </label>


              <input
                name="value"
                defaultValue={
                  getSetting(
                    "whatsapp"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              />


              <button
                type="submit"
                className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save WhatsApp
              </button>


            </form>
                        <form
              action={saveSetting}
              className="rounded-2xl bg-slate-50 p-5"
            >

              <input
                type="hidden"
                name="key"
                value="domain"
              />


              <label className="text-sm font-semibold text-slate-600">
                Website Domain
              </label>


              <input
                name="value"
                defaultValue={
                  getSetting(
                    "domain"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              />


              <button
                type="submit"
                className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save Domain
              </button>


            </form>


          </div>


        </section>




        {/* SEO Settings */}


        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            SEO Settings
          </h2>



          <div className="mt-6 grid gap-6">


            <form
              action={saveSetting}
              className="rounded-2xl bg-slate-50 p-5"
            >

              <input
                type="hidden"
                name="key"
                value="seo_title"
              />


              <label className="text-sm font-semibold text-slate-600">
                SEO Title
              </label>


              <input
                name="value"
                defaultValue={
                  getSetting(
                    "seo_title"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              />


              <button
                type="submit"
                className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save SEO Title
              </button>


            </form>




            <form
              action={saveSetting}
              className="rounded-2xl bg-slate-50 p-5"
            >

              <input
                type="hidden"
                name="key"
                value="seo_description"
              />


              <label className="text-sm font-semibold text-slate-600">
                SEO Description
              </label>


              <textarea
                name="value"
                defaultValue={
                  getSetting(
                    "seo_description"
                  )
                }
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
              />


              <button
                type="submit"
                className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save SEO Description
              </button>


            </form>


          </div>


        </section>
                {/* Payment Settings */}


        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            Payment Settings
          </h2>


          <p className="mt-2 text-sm text-slate-500">
            Payment gateway configuration.
          </p>



          <div className="mt-6 grid gap-6 md:grid-cols-2">


            <div className="rounded-2xl bg-slate-50 p-6">


              <p className="text-sm font-semibold text-slate-500">
                Gateway
              </p>


              <h3 className="mt-2 text-xl font-bold text-slate-900">
                NOWPayments
              </h3>


              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Connected
              </span>


            </div>




            <div className="rounded-2xl bg-slate-50 p-6">


              <p className="text-sm font-semibold text-slate-500">
                Currency
              </p>


              <h3 className="mt-2 text-xl font-bold text-slate-900">
                USD
              </h3>


              <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                Active
              </span>


            </div>


          </div>


        </section>




        {/* System Status */}


        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            System Status
          </h2>


          <div className="mt-6 grid gap-5 md:grid-cols-3">


            <div className="rounded-2xl bg-green-50 p-5">

              <p className="text-sm font-semibold text-green-700">
                Database
              </p>

              <p className="mt-2 text-xl font-bold text-green-800">
                Online
              </p>

            </div>




            <div className="rounded-2xl bg-green-50 p-5">

              <p className="text-sm font-semibold text-green-700">
                Website
              </p>

              <p className="mt-2 text-xl font-bold text-green-800">
                Operational
              </p>

            </div>




            <div className="rounded-2xl bg-green-50 p-5">

              <p className="text-sm font-semibold text-green-700">
                API
              </p>

              <p className="mt-2 text-xl font-bold text-green-800">
                Running
              </p>

            </div>


          </div>


        </section>




        {settings.length === 0 && (

          <section className="rounded-3xl border border-yellow-200 bg-yellow-50 p-8">


            <h2 className="text-xl font-bold text-yellow-800">
              No Settings Found
            </h2>


            <p className="mt-2 text-yellow-700">
              Add settings values using the forms above.
            </p>


          </section>

        )}



      </div>


    </main>

  );

}