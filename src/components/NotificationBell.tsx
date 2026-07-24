"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import { getNotifications } from "@/lib/notifications";
import { supabase } from "@/lib/supabase";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadNotifications() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const notifications = user
          ? ((await getNotifications(user.id)) ?? [])
          : [];

        if (mounted) {
          setUnreadCount(notifications.length);
        }
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Link
      href="/notifications"
      className="relative inline-flex items-center justify-center"
      title="Notifications"
    >
      <Bell size={24} />

      {!isLoading && unreadCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}