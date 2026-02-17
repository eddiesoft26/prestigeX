import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiTrendingUp, HiArrowNarrowRight } from "react-icons/hi";

const RealEstatePreview = () => {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Logic */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">Tangible Wealth</span>
            <h2 className="text-slate-900 text-4xl md:text-6xl font-black mt-4 tracking-tight leading-[0.9]">
              Real Estate <br /><span className="text-slate-400">Reimagined.</span>
            </h2>
          </div>
          <Link to="/real-estate-page" className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black transition-all hover:bg-indigo-600">
            Explore Portfolio <HiArrowNarrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-auto md:h-[600px]">
          
          {/* Feature Case 1: The Landmark */}
          <div className="md:col-span-2 lg:col-span-3 bg-slate-100 rounded-[3rem] relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Commercial Real Estate"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 self-start px-4 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    Commercial Tier
                </div>
                <h3 className="text-white text-3xl font-black">Metropolitan <br />Business Hubs</h3>
            </div>
          </div>

          {/* Feature Case 2: Statistics Card */}
          <div className="md:col-span-2 lg:col-span-1 bg-indigo-600 rounded-[3rem] p-8 flex flex-col justify-between text-white shadow-2xl shadow-indigo-200">
            <HiOutlineOfficeBuilding className="w-12 h-12 opacity-50" />
            <div>
                <span className="text-4xl font-black block">$4.2B+</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Assets Managed</span>
            </div>
          </div>

          {/* Feature Case 3: Residential */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-800 rounded-[3rem] relative overflow-hidden group">
             <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
              alt="Luxury Residential"
            />
            <div className="absolute top-8 left-8">
                <div className="flex items-center gap-2 text-white font-black italic">
                    <HiOutlineLocationMarker className="text-indigo-400" />
                    Global Luxury
                </div>
            </div>
          </div>

          {/* Feature Case 4: ROI Graphic */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-50 border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <HiTrendingUp size={24} />
                </div>
                <span className="font-black text-slate-900">Yield Optimization</span>
             </div>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Our real estate algorithms identify undervalued prime properties before they hit the public market, ensuring 12-18% annual capital appreciation.
             </p>
          </div>

          {/* Feature Case 5: Secondary Stats */}
          <div className="md:col-span-2 lg:col-span-4 bg-slate-900 rounded-[3rem] flex flex-col md:flex-row items-center justify-around p-10 relative overflow-hidden">
             <div className="text-center z-10">
                <span className="text-indigo-400 text-4xl font-black block">98%</span>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Occupancy Rate</span>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block z-10"></div>
             <div className="text-center z-10">
                <span className="text-indigo-400 text-4xl font-black block">24</span>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Countries Covered</span>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block z-10"></div>
             <div className="text-center z-10">
                <span className="text-indigo-400 text-4xl font-black block">12%</span>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Avg. Rental Yield</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealEstatePreview;