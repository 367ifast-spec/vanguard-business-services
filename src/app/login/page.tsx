import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-5xl font-bold">
            Login
          </h1>

          <p className="mt-4 text-gray-400">
            Access your Vanguard Marketplace account.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}