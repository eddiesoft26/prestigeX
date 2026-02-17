import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi";

const faqs = [
  {
    q: "How secure is the investment platform?",
    a: "All funds are protected using industry-grade encryption, secure multi-sig asset storage systems, and continuous AI-driven monitoring to ensure maximum safety for every investor.",
  },
  {
    q: "How long does withdrawal take?",
    a: "Withdrawals are processed instantly through our automated liquidity gates. Once approved, funds typically hit your wallet within minutes, depending on the specific blockchain network traffic.",
  },
  {
    q: "Is there a minimum investment amount?",
    a: "Yes, our entry-level Starter Plan begins at $100. Each plan is designed to scale with your financial goals, with varying minimums across Premium and Ultimate tiers.",
  },
  {
    q: "Can I monitor my investment performance?",
    a: "Absolutely. Your private dashboard provides real-time high-fidelity tracking, earnings heatmaps, and a complete verifiable transaction history available 24/7.",
  },
];

const FAQSection = () => {
  const [active, setActive] = useState(null);

  return (
    // PURE STARK WHITE: To provide a clean break from the dark sections
    <section className="bg-white py-32 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">
                Support Center
            </span>
            <h2 className="text-slate-900 text-4xl md:text-5xl font-black mt-4 tracking-tight">
                Common Questions
            </h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((item, index) => {
            const isActive = active === index;
            
            return (
              <div
                key={index}
                className={`group transition-all duration-500 rounded-[2rem] overflow-hidden ${
                  isActive 
                    ? "bg-white shadow-[0_20px_50px_rgba(79,70,229,0.15)] border-indigo-100" 
                    : "bg-slate-50 border-transparent hover:bg-slate-100"
                } border`}
              >
                <button
                  className="w-full text-left p-8 md:p-10 flex justify-between items-center gap-6"
                  onClick={() => setActive(isActive ? null : index)}
                >
                  <div className="flex gap-6 items-center">
                    {/* Floating Number Index */}
                    <span className={`hidden md:block text-sm font-black transition-colors ${
                        isActive ? "text-indigo-600" : "text-slate-300"
                    }`}>
                        0{index + 1}
                    </span>
                    <h3 className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${
                        isActive ? "text-slate-900" : "text-slate-600"
                    }`}>
                        {item.q}
                    </h3>
                  </div>

                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? "bg-indigo-600 text-white rotate-180" : "bg-white text-slate-400 shadow-sm"
                  }`}>
                    {isActive ? <HiMinus className="w-5 h-5" /> : <HiPlus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="px-8 md:px-24 pb-10">
                        <div className="h-px w-full bg-slate-100 mb-6"></div>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Catchy Footer Link */}
        <div className="text-center mt-16">
            <p className="text-slate-400 font-medium italic">
                Still have questions? <span className="text-indigo-600 cursor-pointer hover:underline font-bold not-italic">Contact our 24/7 support team</span>
            </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;