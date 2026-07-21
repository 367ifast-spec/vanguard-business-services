"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const unreadCount = 4;

  return (
    <Link
      href="/notifications"
      className="relative inline-flex items-center justify-center"
    >
      <Bell size={24} />

      {unreadCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}