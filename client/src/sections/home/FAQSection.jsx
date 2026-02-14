import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How secure is the investment platform?",
    a: "All funds are protected using industry-grade encryption, secure asset storage systems, and continuous monitoring to ensure maximum safety.",
  },
  {
    q: "How long does withdrawal take?",
    a: "Withdrawals are processed instantly once approved and typically completed within minutes depending on the network.",
  },
  {
    q: "Is there a minimum investment amount?",
    a: "Yes, each investment plan has its own minimum requirement which is clearly displayed on the plans section.",
  },
  {
    q: "Can I monitor my investment performance?",
    a: "Yes. The dashboard provides real-time tracking, earnings statistics, and complete transaction history.",
  },
];

const FAQSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-brand-dark py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 cursor-pointer"
              onClick={() => setActive(active === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{item.q}</h3>

                <div className="text-brand-blue text-2xl font-bold">
                  {active === index ? "-" : "+"}
                </div>
              </div>

              <AnimatePresence>
                {active === index && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-gray-300 mt-4 overflow-hidden"
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
