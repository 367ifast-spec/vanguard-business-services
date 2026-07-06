"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  CreditCard,
  Globe2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "US LLC Registration",
    desc: "Fast & compliant company formation",
  },
  {
    icon: Landmark,
    title: "UK LTD Registration",
    desc: "Professional business incorporation",
  },
  {
    icon: CreditCard,
    title: "Business Banking",
    desc: "Banking guidance & payment setup",
  },
  {
    icon: Globe2,
    title: "Global Expansion",
    desc: "Worldwide business solutions",
  },
];

export default function HeroCards() {
  return (
    <div className="relative">

      {/* Main Glass Card */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-3">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Vanguard Business Services
            </h3>

            <p className="text-gray-400">
              Trusted by Global Entrepreneurs
            </p>
          </div>

        </div>

        <div className="space-y-5">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2,
                }}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1735] p-5 transition hover:border-blue-500"
              >
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-600 p-3">
                    <Icon size={24} />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {card.title}
                    </h4>

                    <p className="text-sm text-gray-400">
                      {card.desc}
                    </p>

                  </div>

                </div>

                <CheckCircle2
                  className="text-green-400"
                  size={22}
                />

              </motion.div>
            );
          })}

        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">

          <h4 className="text-3xl font-bold">
            1000+
          </h4>

          <p className="mt-2 text-blue-100">
            Entrepreneurs Served Worldwide
          </p>

        </div>

      </motion.div>

      {/* Floating Card */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute -left-10 top-12 rounded-2xl border border-white/10 bg-[#0f1836] px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <p className="text-sm text-gray-400">
          Success Rate
        </p>

        <h3 className="text-3xl font-bold text-blue-400">
          99%
        </h3>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute -right-8 bottom-16 rounded-2xl border border-white/10 bg-[#0f1836] px-5 py-4 shadow-xl backdrop-blur-xl"
      >
        <p className="text-sm text-gray-400">
          Support
        </p>

        <h3 className="text-3xl font-bold text-cyan-400">
          24/7
        </h3>
      </motion.div>

    </div>
  );
}