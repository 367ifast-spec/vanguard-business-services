"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "#home";
      navigation.forEach((item) => {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = item.href;
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#040714]/80 backdrop-blur-2xl shadow-2xl"
          : "bg-[#040714]/60 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Get Started
            <ArrowRight size={18} />
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-white/10 bg-white/5 p-3 lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#040714]/95 lg:hidden">
          <nav className="flex flex-col px-6 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActive(item.href);
                  setIsOpen(false);
                }}
                className={`rounded-xl px-4 py-3 transition ${
                  active === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {item.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Get Started
              <ArrowRight size={18} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
