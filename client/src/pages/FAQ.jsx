// src/pages/FAQ.jsx
import React from "react";
import { motion } from "framer-motion";
// import FAQComponent from "../components/FAQComponent"; // your existing FAQ component
import FAQSection from "../sections/home/FAQSection";
import DashboardLayout from "../dashboard/DashboardLayout";

const FAQ = () => {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6">
            Have questions about investing with us? We've compiled the most common inquiries to help you get started quickly and confidently.
          </p>
        </motion.div>
        {/* Hero background */}
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90 z-0"></div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-gray-800 text-center"
          >
            Your Questions Answered
          </motion.h2>

          {/* Import your FAQ component here */}
          <FAQSection />
        </div>
      </section>

      {/* Trust / Assurance Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-4 text-gray-800"
          >
            Invest with Confidence
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            All user investments are secured with over $10M insurance coverage. Our platform trades with transparency, ensuring you receive 50% of the profits daily while we manage the rest responsibly. Your trust is our priority.
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
