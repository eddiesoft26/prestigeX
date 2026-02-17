import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import ScrollReveal from "../../components/ScrollAnimation";
import RecentActivityToast from "../../components/RecentActivityTicker";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const { openAuthModal } = useAuth();
  return (
    <ScrollReveal className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Video - Slightly more brightness for that 'catchy' feel */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.85]"
      >
        <source src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771155339/hero_bg_hqyidj.mp4" type="video/mp4" />
      </video>

      {/* NEW: Light Overlay Gradient - Gives it an airy, high-trust banking feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-slate-900/40 to-slate-900/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-4 text-white flex flex-col items-center gap-6">
        
        {/* Headline - Shifted to a more modern weight and cleaner font */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight animate-fadeIn">
          Prestige Meets <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
            Performance.
          </span>
        </h1>

        {/* Subtext */}
        <div className="max-w-2xl animate-fadeIn delay-200">
          <p className="text-slate-100 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
            Experience a new standard in crypto investment{" "}
            <span className="block mt-2">
              <TypeAnimation
                sequence={[
                  "for secure growth", 2000,
                  "for institutional reliability", 2000,
                  "for modern investors", 2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-indigo-400 font-bold"
              />
            </span>
          </p>
        </div>

        {/* Call-to-Action Buttons - Pill-shaped and Catchy */}
        <div className="flex flex-col sm:flex-row gap-5 mt-8 animate-fadeIn delay-400">
          <Link to="/auth?mode=register">
            <button className="px-10 py-4 cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </button>
          </Link>
          
          <Link to="/auth?mode=login">
            <button className="px-10 py-4 cursor-pointer bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300">
              Client Login
            </button>
          </Link>
        </div>

        {/* Trust Badge */}
        <p className="text-slate-300 text-sm mt-6 font-medium tracking-wide animate-fadeIn delay-600 uppercase">
          Trusted by over 10k+ active investors worldwide
        </p>
      </div>

      {/* Toasts and Decorations */}
      <RecentActivityToast />
      
      {/* Decorative floating dots - Changed to Indigo/Teal */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-2 h-2 bg-indigo-500 rounded-full animate-pulse opacity-60 top-1/4 left-10"></div>
        <div className="absolute w-3 h-3 bg-teal-400 rounded-full animate-pulse opacity-40 top-1/3 right-20"></div>
        <div className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50 bottom-1/4 left-1/3"></div>
      </div>
    </ScrollReveal>
  );
};

export default Hero;