// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API/email integration
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section with animated gradient */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-[length:200%_200%] z-0"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Need Help? Reach Out Anytime
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6">
            Our support team is ready 24/7. Start a live chat for instant
            assistance or leave us a message below.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-500 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white/90 transition animate-pulse"
            onClick={() => {
              if (window?.ChatbotAPI) window.ChatbotAPI.openChat();
            }}
          >
            Chat with us now
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onClick={() => {
              if (window?.ChatbotAPI) window.ChatbotAPI.openChat();
            }}
            className="text-3xl font-bold mb-6 text-center text-gray-800"
          >
            Send Us a Message
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-3xl p-8 space-y-4"
          >
            {submitted && (
              <div className="text-green-600 font-medium text-center animate-fade-in">
                Thank you! We will get back to you soon.
              </div>
            )}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Alternative Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-gray-800"
          >
            Other Ways to Reach Us
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">📧</span>
              <p className="text-gray-700 font-medium">support@prestigex.com</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🌐</span>
              <p className="text-gray-700 font-medium">Telegram / Live Chat</p>
            </div>
          </motion.div>
          <p className="mt-8 text-gray-500 text-sm">
            Your information is secure. We never share your details. Support is
            available 24/7.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
