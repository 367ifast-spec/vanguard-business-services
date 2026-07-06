"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#040714]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 lg:flex">

          <a href="#home" className="transition hover:text-blue-400">
            Home
          </a>

          <a href="#about" className="transition hover:text-blue-400">
            About
          </a>

          <a href="#services" className="transition hover:text-blue-400">
            Services
          </a>

          <a href="#testimonials" className="transition hover:text-blue-400">
            Reviews
          </a>

          <a href="#faq" className="transition hover:text-blue-400">
            FAQ
          </a>

          <a href="#contact" className="transition hover:text-blue-400">
            Contact
          </a>

        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#040714] lg:hidden">
          <nav className="flex flex-col px-6 py-6">

            <a
              href="#home"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>

            <a
              href="#about"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>

            <a
              href="#services"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>

            <a
              href="#testimonials"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </a>

            <a
              href="#faq"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>

            <a
              href="#contact"
              className="py-3 text-gray-300 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </a>

          </nav>
        </div>
      )}
    </header>
  );
}