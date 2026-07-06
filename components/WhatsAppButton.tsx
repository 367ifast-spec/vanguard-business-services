"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/19177359503"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={34} />
    </a>
  );
}