import React, { useEffect } from 'react';
import { HiOutlinePresentationChartLine, HiOutlineLightBulb, HiOutlineGlobeAlt, HiOutlineShieldCheck } from "react-icons/hi2";
import ScrollReveal from "../components/ScrollAnimation";

const MarketAnalysis = () => {
  // Load TradingView Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": true,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "660",
      "plotLineColorGrowing": "rgba(79, 70, 229, 1)",
      "plotLineColorFalling": "rgba(79, 70, 229, 1)",
      "gridLineColor": "rgba(42, 46, 57, 0)",
      "scaleFontColor": "rgba(134, 140, 151, 1)",
      "belowLineFillColorGrowing": "rgba(79, 70, 229, 0.12)",
      "belowLineFillColorFalling": "rgba(79, 70, 229, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
      "tabs": [
        {
          "title": "Indices",
          "symbols": [
            { "s": "FOREXCOM:SPX500", "d": "S&P 500" },
            { "s": "FOREXCOM:NSXUSD", "d": "US Tech 100" },
            { "s": "FOREXCOM:DJI", "d": "Dow 30" }
          ]
        },
        {
          "title": "Crypto",
          "symbols": [
            { "s": "BINANCE:BTCUSDT", "d": "Bitcoin" },
            { "s": "BINANCE:ETHUSDT", "d": "Ethereum" },
            { "s": "BINANCE:SOLUSDT", "d": "Solana" }
          ]
        }
      ]
    });
    document.getElementById('tradingview-widget')?.appendChild(script);
  }, []);

  const experts = [
    {
      name: "Dr. James Wilson",
      role: "Chief Market Analyst",
      bio: "Former Wall Street economist with over 20 years of experience in financial markets analysis.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
    },
    {
      name: "Sarah Johnson",
      role: "Real Estate Market Specialist",
      bio: "Specializes in real estate market analysis and property investment strategies.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
    },
    {
      name: "Michael Chen",
      role: "Global Markets Strategist",
      bio: "Focuses on international market trends and cross-border investment opportunities.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
    },
    {
      name: "Emma Rodriguez",
      role: "Technical Analysis Expert",
      bio: "Specializes in technical chart analysis and market timing strategies.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-32">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 max-w-7xl mx-auto mb-20 text-center">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <HiOutlinePresentationChartLine className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Access real-time data and expert perspectives that drive global capital movements.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. LIVE MARKET DATA SECTION */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="bg-[#0b1120] border border-white/5 rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
             <HiOutlineGlobeAlt className="w-32 h-32 text-indigo-500" />
          </div>
          <div id="tradingview-widget" className="relative z-10"></div>
        </div>
      </section>

      {/* 3. WEEKLY OUTLOOK SECTION (Added Section) */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <HiOutlineLightBulb />, title: "Market Outlook", desc: "Expect volatility in Tech indices ahead of central bank meetings." },
            { icon: <HiOutlineGlobeAlt />, title: "Global Flow", desc: "Institutional capital is shifting toward emerging real estate hubs." },
            { icon: <HiOutlineShieldCheck />, title: "Risk Assessment", desc: "Currently maintaining a 'Neutral' stance on high-cap digital assets." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
              <div className="text-indigo-400 text-3xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPERTS SECTION */}
      <section className="px-6 max-w-7xl mx-auto pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Meet the <span className="text-indigo-400">Strategists</span></h2>
          <p className="text-slate-500">The minds behind Galaxy Digital's market-beating performance.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, idx) => (
            <div key={idx} className="group relative">
              <div className="relative h-[400px] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
              <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">{expert.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {expert.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MarketAnalysis;