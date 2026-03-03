import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HiOutlineArrowTrendingUp, HiOutlineBuildingOffice2, HiOutlineChevronRight, HiOutlineChartBar, HiOutlineGlobeAlt } from "react-icons/hi2";
import ScrollReveal from '../components/ScrollAnimation';


const InvestmentOpportunities = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans">
        {/* 1. INSTITUTIONAL HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Galaxy Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.4em] text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
              Alpha Generation
            </span>
            <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
              Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Opportunities</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
              Diversify your portfolio with our range of investment options, engineered for the next generation of global wealth.
            </p>

            {/* HIGH-PERFORMANCE STATS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 border-t border-white/5 pt-16">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-500/10 rounded-2xl mb-4">
                  <HiOutlineChartBar className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-2">15%+</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Annual Returns</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-3 bg-indigo-500/10 rounded-2xl mb-4">
                  <HiOutlineBuildingOffice2 className="text-indigo-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-2">$50M+</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Properties Managed</p>
              </div>

              <div className="flex flex-col items-center col-span-2 lg:col-span-1">
                <div className="p-3 bg-cyan-500/10 rounded-2xl mb-4">
                  <HiOutlineGlobeAlt className="text-cyan-400 w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-2">100+</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Global Liquidity Nodes</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* SECTION 1: CRYPTOCURRENCY INVESTMENT */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Content Left */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineArrowTrendingUp className="text-blue-400 text-2xl" />
                <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em]">Digital Asset Alpha</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Quantum-Grade <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Crypto Portfolios</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                At Galaxy Digital, we don't just follow the market; we anticipate it. Our cryptocurrency investment strategies utilize high-frequency neural networks and deep liquidity nodes to deliver consistent ROI. 
                By merging institutional-grade risk management with the explosive growth of the blockchain frontier, we provide a secure vehicle for your capital to outperform traditional benchmarks.
              </p>

              <RouterLink to="/about">
                <button className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center gap-3 shadow-lg shadow-blue-600/20">
                  Discover Our Mission <HiOutlineChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </RouterLink>
            </ScrollReveal>
          </div>

          {/* Image Right */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <ScrollReveal direction="right">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10 shadow-2xl">
                  {/* CRYPTO CLOUDINARY IMAGE */}
                  <img 
                    src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771864388/cdc_home_exchangehero_usd_aysmtm.webp" 
                    alt="Crypto Trading Terminal" 
                    className="w-full h-[400px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: REAL ESTATE INVESTMENT (Reversed Layout) */}
      <section className="py-24 px-6 md:px-20 bg-[#030712] border-t border-white/5 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Image Left */}
          <div className="w-full lg:w-1/2">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10 shadow-2xl">
                  {/* REAL ESTATE CLOUDINARY IMAGE */}
                  <img 
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200" 
                    alt="Luxury Real Estate Portfolio" 
                    className="w-full h-[400px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Content Right */}
          <div className="w-full lg:w-1/2">
            <ScrollReveal direction="right">
              <div className="flex items-center gap-3 mb-6">
                <HiOutlineBuildingOffice2 className="text-indigo-400 text-2xl" />
                <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">Hard Asset Stability</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Fractional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">Real Estate Assets</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Diversify your wealth with the timeless stability of physical property. Galaxy Digital provides fractional access to high-yield commercial and residential portfolios in the world's most "marvelous" markets, including Dubai, London, and Singapore. 
                Enjoy the security of tangible assets combined with weekly commission payouts, bringing institutional-grade real estate into the palm of your hand.
              </p>

              <RouterLink to="/real-estate-page">
                <button className="group px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center gap-3">
                  Explore Portfolio <HiOutlineChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </RouterLink>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentOpportunities;