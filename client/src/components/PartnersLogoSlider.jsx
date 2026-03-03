import React from "react";
import {
  SiBitcoin,
  SiEthereum,
  SiBinance,
  SiCoinbase,
  SiVisa,
  SiMastercard,
} from "react-icons/si";

const partners = [
  { Icon: SiBitcoin, color: "#F7931A", name: "Bitcoin" },
  { Icon: SiEthereum, color: "#627EEA", name: "Ethereum" },
  { Icon: SiBinance, color: "#F3BA2F", name: "Binance" },
  { Icon: SiCoinbase, color: "#0052FF", name: "Coinbase" },
  { Icon: SiVisa, color: "#FFFFFF", name: "Visa" },
  { Icon: SiMastercard, color: "#EB001B", name: "Mastercard" },
];

const PartnerLogoSlider = () => {
  return (
    /* BREAKOUT LOGIC */
    <div className="relative w-screen left-1/2 -translate-x-1/2 py-4 overflow-x-hidden">
      
      <div className="w-full">
        {/* Smaller Margin for the Label */}
        <p className="text-center text-slate-500 font-black text-[9px] uppercase tracking-[0.4em] mb-6">
          Institutional Liquidity
        </p>

        {/* MAIN CONTAINER: Reduced height and tighter padding */}
        <div className="relative w-full bg-gradient-to-b from-[#0f172a] to-[#020617] shadow-xl">
          
          {/* Top & Bottom Neon Lines - Made thinner (0.5px) */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

          {/* Side Fades */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0f172a] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0f172a] to-transparent z-10"></div>

          {/* Vertical Padding Reduced from py-20 to py-10 */}
          <div className="py-10 overflow-hidden group">
            <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 mx-8 transition-all duration-500"
                >
                  {/* Smaller Glass Card: p-3 instead of p-5 */}
                  <div className="relative p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg group-hover:border-blue-500/40 transition-colors">
                    <partner.Icon
                      style={{ color: partner.color }}
                      className="text-2xl md:text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm md:text-base tracking-tight">
                      {partner.name.toLowerCase()}
                    </span>
                    <span className="text-blue-400/50 text-[8px] font-mono uppercase tracking-tighter">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogoSlider;