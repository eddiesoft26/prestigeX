import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMailOpen, HiCheckCircle } from "react-icons/hi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
    // Hide success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    // PURE WHITE BASE: This makes the dark card "float"
    <section className="bg-white py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* THE FLOATING CARD: Deep Indigo Gradient */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] px-8 py-16 md:py-20 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.4)]">
          
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            
            {/* Catchy Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-8 transform -rotate-6 transition-transform hover:rotate-0 duration-500">
                <HiOutlineMailOpen className="w-8 h-8 text-indigo-400" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Stay Ahead of <span className="text-indigo-400">the Market</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 font-medium">
              Join 15,000+ investors receiving weekly market insights and exclusive platform updates directly to their inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row justify-center gap-3 items-stretch max-w-lg mx-auto"
            >
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-8 py-5 rounded-2xl text-white font-black tracking-wide transition-all duration-300 shadow-xl shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
              >
                Join the Circle
              </button>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-emerald-400 mt-8 font-bold"
                >
                  <HiCheckCircle className="w-6 h-6" />
                  <span>Welcome to the Elite! Check your inbox soon.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-8">
               🔒 We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;