import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import ScrollReveal from "../../components/ScrollAnimation";
import { useAuth } from "../../context/AuthContext";
import LiveActivityTicker from "../home/LiveActivityTicker";

const Hero = () => {
  const { openAuthModal } = useAuth();
  
  return (
    <ScrollReveal className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden bg-slate-950">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
      >
        <source
          src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771155339/hero_bg_hqyidj.mp4"
          type="video/mp4"
        />
      </video>

      {/* GALAXY THEMED OVERLAY: Deep Blues and Space Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-950/60 to-slate-950"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl px-4 text-white flex flex-col items-center gap-6">
        
        {/* New Catchy Badge */}
        <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
          The Future of Wealth is Universal
        </div>

        {/* Headline: Now emphasizing "GALAXY" and "Navigation" */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] animate-fadeIn">
          Navigate the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
            Crypto Galaxy.
          </span>
        </h1>

        {/* Subtext: More enticing and direct */}
        <div className="max-w-2xl animate-fadeIn delay-200">
          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
            Stop searching. Start earning. GALAXY provides the cosmic edge 
            <span className="block mt-2">
              <TypeAnimation
                sequence={[
                  "for astronomical returns",
                  2000,
                  "for institutional-grade security",
                  2000,
                  "for the next gen of investors",
                  2000,
                  "to navigate your wealth",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-blue-400 font-bold"
              />
            </span>
          </p>
        </div>

        {/* Call-to-Action Buttons: Adjusted to Blue/Galaxy Theme */}
        <div className="flex flex-col sm:flex-row gap-5 mt-8 animate-fadeIn delay-400">
          <Link to="/auth?mode=register">
            <button className="px-12 py-5 cursor-pointer bg-blue-600 text-white font-black rounded-full shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:shadow-blue-500/60 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-sm">
              Launch Your Portfolio
            </button>
          </Link>

          <Link to="/auth?mode=login">
            <button className="px-12 py-5 cursor-pointer bg-white/5 backdrop-blur-xl border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 uppercase tracking-wider text-sm">
              Member Portal
            </button>
          </Link>
        </div>

        {/* Updated Trust Badge */}
        <div className="flex items-center gap-4 mt-8 opacity-80 animate-fadeIn delay-600">
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                ))}
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Join 15k+ Galactic Traders
            </p>
        </div>
      </div>

      {/* Decorative Stars/Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping top-1/4 left-10"></div>
        <div className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-pulse top-1/2 right-20"></div>
        <div className="absolute w-2 h-2 bg-blue-600/20 rounded-full blur-xl top-10 right-1/4"></div>
      </div>

      <div className="absolute bottom-0 w-full">
        <LiveActivityTicker />
      </div>
    </ScrollReveal>
  );
};

export default Hero;
