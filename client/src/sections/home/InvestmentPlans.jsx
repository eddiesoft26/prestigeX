import React from "react";
import { Link } from "react-router-dom";
import { HiArrowSmallRight, HiOutlineShieldCheck, HiOutlineCpuChip } from "react-icons/hi2"; 

const plans = [
  { name: "Starter Plan", range: "$100 - $999", roi: "15%", duration: "24 Hours", highlighted: false },
  { name: "Premium Plan", range: "$1,000 - $4,999", roi: "35%", duration: "24 Hours", highlighted: true },
  { name: "Pro Plan", range: "$5,000 - $9,999", roi: "50%", duration: "24 Hours", highlighted: false },
  { name: "Ultimate Plan", range: "$10,000 & Above", roi: "60%", duration: "24 Hours", highlighted: false },
];

const InvestmentPlans = () => {
  return (
    <section className="bg-[#020617] text-white py-20 px-6 overflow-hidden relative">
      {/* Galaxy Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

      {/* 1. TOP SECTION: THE STATS */}
      <div className="max-w-6xl mx-auto mb-20 relative z-10">
        <h2 className="text-center text-3xl md:text-5xl font-black mb-12 tracking-tight">
          The backbone of <span className="text-blue-500">Global Commerce</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-white/5 pb-16">
          <div>
            <h3 className="text-3xl md:text-4xl font-black">135+</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">Currencies Supported</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black">$1.4T</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">Processed in 2024</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black">99.999%</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">Historical Uptime</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black">200M+</h3>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">Active Subscriptions</p>
          </div>
        </div>
      </div>

      {/* 2. NEW: FEATURE IMAGE & VALUE PROP SECTION */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 mb-28 relative z-10">
        {/* LEFT: Image Placeholder */}
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              {/* CLOUDINARY IMAGE GOES HERE */}
              <img 
                src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771873764/plans_image_zvtdul.png" 
                alt="Galaxy Investment Performance" 
                className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Summary */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
           <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Quantum Growth</span>
           <h3 className="text-3xl md:text-4xl font-bold mb-6">Designed for the Next Billion Users</h3>
           <p className="text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
             Our investment engine utilizes deep-learning nodes to navigate the volatility of the crypto market, delivering 
             stable returns across four optimized tiers of participation.
           </p>
           <div className="flex justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <HiOutlineShieldCheck className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-tighter">Verified Assets</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <HiOutlineCpuChip className="text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-tighter">AI-Managed</span>
              </div>
           </div>
        </div>
      </div>

      {/* 3. PLANS SECTION: Staggered "2x2" Diamond Layout */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* TOP ROW: Premium & Starter */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {[plans[1], plans[0]].map((plan, index) => (
            <div
              key={index}
              className={`rounded-[2rem] p-6 transition-all duration-500 border ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 border-transparent shadow-2xl shadow-blue-500/20 scale-105"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="text-center">
                <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-4 ${plan.highlighted ? "text-blue-200" : "text-blue-500"}`}>
                  {plan.name}
                </h3>
                <span className="text-xl md:text-3xl font-black block mb-1">{plan.range}</span>
                <span className={`text-lg font-bold ${plan.highlighted ? "text-white" : "text-green-400"}`}>
                  {plan.roi} ROI
                </span>
                <p className="text-slate-500 text-[9px] uppercase mt-2 tracking-widest">{plan.duration} Term</p>
              </div>
              <Link to="/auth?mode=register" className="mt-6 block">
                <button className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted ? "bg-white text-blue-700" : "bg-blue-600 text-white hover:bg-blue-500"
                }`}>
                  Invest <HiArrowSmallRight />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW: Pro & Ultimate */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 md:px-12">
          {[plans[2], plans[3]].map((plan, index) => (
            <div
              key={index}
              className="rounded-[2rem] p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-center">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black mb-4 text-blue-500">
                  {plan.name}
                </h3>
                <span className="text-xl md:text-3xl font-black block mb-1">{plan.range}</span>
                <span className="text-lg font-bold text-green-400">
                  {plan.roi} ROI
                </span>
                <p className="text-slate-500 text-[9px] uppercase mt-2 tracking-widest">{plan.duration} Term</p>
              </div>
              <Link to="/auth?mode=register" className="mt-6 block">
                <button className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-white/10 text-white border border-white/10 hover:bg-white/20">
                  Invest <HiArrowSmallRight />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;