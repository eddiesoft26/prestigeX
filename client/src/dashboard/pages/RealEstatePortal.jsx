import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineLocationMarker, 
  HiOutlineChartBar, 
  HiOutlineShieldCheck,
  HiOutlineChevronRight,
  HiOutlineGlobe
} from "react-icons/hi";

// Mock Data for the Portfolio - Replace with your API later
const properties = [
  {
    id: "RE-901",
    name: "Skyline Apex Tower",
    location: "Dubai, UAE",
    minInvestment: 5000,
    expectedApy: "18.5%",
    occupancy: "98%",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "RE-902",
    name: "London Bridge Plaza",
    location: "London, UK",
    minInvestment: 2500,
    expectedApy: "12.2%",
    occupancy: "100%",
    type: "Mixed-Use",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800",
    status: "Funding"
  },
  {
    id: "RE-903",
    name: "Silicon Valley Tech Hub",
    location: "California, USA",
    minInvestment: 10000,
    expectedApy: "22.8%",
    occupancy: "95%",
    type: "Tech Campus",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    status: "Premium Only"
  }
];

const RealEstatePortal = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-8 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Equity Assets
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            REAL ESTATE <span className="text-slate-500">PORTFOLIO</span>
          </h1>
          <p className="mt-3 text-slate-400 font-medium max-w-xl">
            Fractional ownership in world-class commercial and residential developments. Secured by physical deeds and institutional management.
          </p>
        </div>

        <div className="flex gap-4">
            <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl text-center min-w-[120px]">
                <p className="text-[10px] font-black text-slate-500 uppercase">Avg. Yield</p>
                <p className="text-xl font-black text-white italic">14.6%</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl text-center min-w-[120px]">
                <p className="text-[10px] font-black text-slate-500 uppercase">Global Nodes</p>
                <p className="text-xl font-black text-indigo-500 italic">24/7</p>
            </div>
        </div>
      </div>

      {/* 2. Global Map / Ticker Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {properties.map((property) => (
           <motion.div 
            key={property.id}
            whileHover={{ y: -10 }}
            className="group relative bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/30 shadow-2xl"
           >
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative">
                 <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
                 <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    {property.status}
                 </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                 <div>
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <HiOutlineLocationMarker size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{property.location}</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tight">{property.name}</h3>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-600 uppercase">Expected ROI</p>
                        <p className="text-lg font-black text-emerald-500">{property.expectedApy}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-600 uppercase">Min. Entry</p>
                        <p className="text-lg font-black text-white">${property.minInvestment.toLocaleString()}</p>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified Deed</span>
                    </div>
                    <button 
                        onClick={() => setSelectedProperty(property)}
                        className="p-3 bg-white text-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
                    >
                        <HiOutlineChevronRight size={20} />
                    </button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* 3. Institutional Trust Banner */}
      <div className="bg-gradient-to-r from-indigo-900/20 to-transparent border border-white/5 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">The PrestigeX Standard</h2>
            <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="text-indigo-500" />
                    <span className="text-xs font-bold text-slate-400">Legal Escrow Verified</span>
                </div>
                <div className="flex items-center gap-2">
                    <HiOutlineChartBar className="text-indigo-500" />
                    <span className="text-xs font-bold text-slate-400">Monthly Yield Distributions</span>
                </div>
                <div className="flex items-center gap-2">
                    <HiOutlineGlobe className="text-indigo-500" />
                    <span className="text-xs font-bold text-slate-400">Tax Optimized Structures</span>
                </div>
            </div>
         </div>
         <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all">
            Download Prospectus (PDF)
         </button>
      </div>

      {/* Property Detail Modal Placeholder */}
      <AnimatePresence>
        {selectedProperty && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedProperty(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                <motion.div 
                    initial={{scale:0.9, opacity:0}} 
                    animate={{scale:1, opacity:1}} 
                    exit={{scale:0.9, opacity:0}}
                    className="relative bg-[#020617] border border-white/10 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-64 md:h-auto">
                            <img src={selectedProperty.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="p-10 space-y-6">
                            <h2 className="text-3xl font-black text-white italic tracking-tighter">{selectedProperty.name}</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                This {selectedProperty.type} asset in {selectedProperty.location} is currently {selectedProperty.occupancy} occupied. 
                                Investors receive monthly dividends based on rental income and capital appreciation.
                            </p>
                            <div className="space-y-4 pt-6">
                                <button 
                                    onClick={() => alert('Redirecting to secure deployment...')}
                                    className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-white uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
                                >
                                    Acquire Equity Unit
                                </button>
                                <button 
                                    onClick={() => setSelectedProperty(null)}
                                    className="w-full py-5 bg-white/5 border border-white/5 rounded-2xl font-black text-slate-500 uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                                >
                                    Return to Market
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealEstatePortal;