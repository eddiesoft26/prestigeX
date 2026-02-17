import React from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  HiOutlineShieldCheck, 
  HiOutlineArrowNarrowRight, 
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt 
} from "react-icons/hi";

import DashboardCards from "../components/DashboardCards";
import TrendingCoins from "../components/TrendingCoin";

const Overview = () => {
  // Pulling the summary data we passed through the Outlet context in DashboardLayout
  const { summary } = useOutletContext();
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* 1. Header Section - Greeting & Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Institutional Terminal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            {greeting}, <span className="text-slate-500">{summary?.user?.fullName?.split(' ')[0] || "Investor"}</span>
          </h1>
          <p className="mt-3 text-slate-400 font-medium flex items-center gap-2">
            <HiOutlineShieldCheck className="text-emerald-500 text-lg" />
            Your accounts are secured with <span className="text-white font-bold">Quantum-AES Encryption</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</p>
                <p className="text-xs font-bold text-emerald-400">All Systems Operational</p>
            </div>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 p-4 rounded-2xl transition-all group">
                <HiOutlineArrowNarrowRight className="text-white group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>

      {/* 2. Primary Financial Cards */}
      <section>
        <DashboardCards data={summary} />
      </section>

      {/* 3. Secondary Bento Grid (Market & Assets) */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left: Tactical Insights & Real Estate */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Real Estate Quick-View */}
            <div className="relative group bg-gradient-to-br from-slate-900 to-[#020617] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <HiOutlineOfficeBuilding size={120} />
               </div>
               
               <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-full">
                 Portfolio Alpha
               </span>
               <h3 className="text-2xl font-black text-white mt-4">Real Estate</h3>
               <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-[200px]">
                 Diversify into prime physical assets. Current average APY: <span className="text-white font-bold">14.2%</span>
               </p>
               
               <button className="mt-8 flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest hover:gap-4 transition-all">
                 Explore Deeds <HiOutlineArrowNarrowRight className="text-indigo-500" />
               </button>
            </div>

            {/* Global Market Stats */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-black text-white">Global Reach</h3>
                        <HiOutlineGlobeAlt className="text-slate-600 text-2xl" />
                    </div>
                    <p className="text-slate-500 text-xs mt-1">Cross-border settlement speed</p>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                        <span className="text-slate-500">Node Sync</span>
                        <span className="text-emerald-400">99.9%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "99.9%" }}
                            className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* Placeholder for Recent Activity Table */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[3rem] p-10">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Recent Activity</h3>
                <button className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase">View All</button>
             </div>
             <div className="flex flex-col items-center justify-center py-10 opacity-20">
                <div className="w-16 h-16 border-2 border-dashed border-slate-500 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineArrowNarrowRight className="rotate-45" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest">Awaiting Transaction Stream...</p>
             </div>
          </div>
        </div>

        {/* Right: Real-time Market Intel */}
        <div className="col-span-12 xl:col-span-4">
           <div className="sticky top-28">
             <TrendingCoins coins={summary?.trending || []} />
             
             {/* Referral CTA Box */}
             <div className="mt-8 p-8 rounded-[2.5rem] bg-indigo-600 shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <h4 className="text-white font-black text-lg leading-tight">Invite your network. <br/>Earn 10% lifetime.</h4>
                <button className="mt-6 w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
                    Copy Referral Link
                </button>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;