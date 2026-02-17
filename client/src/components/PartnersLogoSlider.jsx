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
  { Icon: SiVisa, color: "#1A1F71", name: "Visa" },
  { Icon: SiMastercard, color: "#EB001B", name: "Mastercard" },
];

const PartnerLogoSlider = () => {
  return (
    <div className="w-full py-10 mt-10">
      <p className="text-center text-slate-500 font-bold text-xs uppercase tracking-[0.4em] mb-8">
        Institutional Liquidity Partners
      </p>

      {/* NEW COLOR: Light Indigo Tint with Inner Shadow */}
      <div className="relative bg-indigo-50/50 border-y border-indigo-100/50 py-12 overflow-hidden group shadow-inner">
        
        {/* Dynamic Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10"></div>

        <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 mx-12 grayscale-[0.5] hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-500"
            >
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-indigo-100/50">
                    <partner.Icon
                      style={{ color: partner.color }}
                      className="text-3xl md:text-4xl"
                    />
                </div>
                <span className="font-extrabold text-slate-500 text-base md:text-lg tracking-tight hidden sm:block">
                    {partner.name}
                </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogoSlider;