"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/logout/actions";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
    >
      Logout
    </button>
  );
}