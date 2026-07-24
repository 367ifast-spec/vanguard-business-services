import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-5xl font-bold">
            Register
          </h1>

          <p className="mt-4 text-gray-400">
            Create your Vanguard Marketplace account.
          </p>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
}