import React from "react";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineGlobe, HiOutlineCash } from "react-icons/hi";

const RealEstatePage = () => {
  const properties = [
    {
      name: "The Azure Sky Tower",
      location: "Dubai, UAE",
      type: "Commercial/Office",
      yield: "14.2%",
      status: "Fully Occupied",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200",
    },
    {
      name: "Neo-London Luxury Suites",
      location: "London, UK",
      type: "Residential",
      yield: "11.8%",
      status: "92% Funded",
      image: "https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=1200",
    },
    {
      name: "Singapore Tech Plaza",
      location: "Marina Bay",
      type: "Mixed Use",
      yield: "15.5%",
      status: "Active Acquisition",
      image: "https://images.unsplash.com/photo-1525438128494-3422b40884ee?q=80&w=1200",
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449156003053-c306a0482905?q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Real Estate Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-black uppercase tracking-[0.5em] text-xs mb-4 block"
          >
            Institutional Real Estate
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-6"
          >
            Hard Assets. <br /><span className="text-slate-500">Soft Entry.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium"
          >
            Direct fractional access to the world's most "marvelous" commercial and residential portfolios, traditionally reserved for the top 1%.
          </motion.p>
        </div>
      </section>

      {/* 2. LIVE METRICS BAR */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Assets", value: "$4.2B", icon: HiOutlineGlobe },
            { label: "Annual Yield", value: "12.4%", icon: HiOutlineChartBar },
            { label: "Investors", value: "18k+", icon: HiOutlineShieldCheck },
            { label: "Distributions", value: "$890M", icon: HiOutlineCash },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <stat.icon className="text-indigo-500 w-6 h-6 mb-4" />
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PORTFOLIO SHOWCASE */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-4xl font-black mb-2">Current Acquisitions</h2>
                <p className="text-slate-500 font-medium">Verified properties under PrestigeX management.</p>
            </div>
            <div className="text-indigo-500 font-black text-sm uppercase tracking-widest hidden md:block">
                Scroll to explore
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {properties.map((prop, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5 group"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={prop.name} />
                <div className="absolute top-6 left-6 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    {prop.yield} Target Yield
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    {prop.location}
                </div>
                <h3 className="text-2xl font-black mb-6">{prop.name}</h3>
                
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div>
                        <span className="text-slate-500 text-[10px] uppercase font-black block tracking-widest">Status</span>
                        <span className="text-emerald-400 font-bold">{prop.status}</span>
                    </div>
                    <button className="bg-white text-slate-900 text-xs font-black px-6 py-3 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                        View Deed
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. THE MARVELOUS TRACK RECORD (Large Focus) */}
      <section className="py-24 bg-indigo-600">
          <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-8">
                Ready to own a piece of <br /> the physical world?
              </h2>
              <button className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform">
                Consult an Asset Manager
              </button>
              <p className="mt-8 text-indigo-200 font-medium opacity-80 uppercase text-[10px] tracking-[0.4em]">
                Minimum entry for Real Estate Portfolio: $50,000.00
              </p>
          </div>
      </section>
    </div>
  );
};

export default RealEstatePage;