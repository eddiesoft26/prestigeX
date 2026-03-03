import React from "react";
import {
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../../components/ScrollAnimation";

const WelcomeGalaxy = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#020617] py-24 px-6 md:px-20 overflow-hidden">
      {/* Deep Space Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* LEFT: Video & Image Integration */}
        <div className="w-full lg:w-5/12 order-2 lg:order-1">
          <ScrollReveal direction="left">
            <div className="relative group">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10 bg-[#0b0f1a] shadow-2xl">
                {/* Spokesperson Video (Auto-playing, Silent) */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover opacity-90 brightness-90 group-hover:brightness-100 transition-all duration-700"
                >
                  <source
                    src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771868390/video_2_h57m6e.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Floating "Live Stats" Graphic Overlay (using your percent image) */}
                <div className="absolute top-6 -right-6 md:-right-12 w-48 md:w-64 animate-bounce-slow">
                  <img
                    src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771864388/cdc_home_exchangehero_usd_aysmtm.webp"
                    alt="Interest Growth"
                    className="drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  />
                </div>

                {/* Bottom Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-150"></span>
                    </div>
                    <p className="text-[10px] font-mono text-green-400 uppercase tracking-widest">
                      Galaxy Node Alpha: Operational
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT: High-Conversion Copy */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2">
          <ScrollReveal direction="up">
            <header className="mb-10">
              <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
                Institutional Wealth Management
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-[1.1]">
                Master the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Digital Economy
                </span>{" "}
                with Confidence.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Galaxy is more than just a cryptocurrency investment platform—it
                is your personal gateway to the decentralized frontier. We
                bridge the gap between complex blockchain algorithms and
                sustainable wealth generation, providing you with a secure,
                automated vehicle for capital growth.
              </p>
            </header>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <HiOutlineCpuChip className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Quantum Analytics
                  </h4>
                  <p className="text-slate-500 text-sm leading-snug">
                    AI-driven models that predict market shifts with 98%
                    operational uptime.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <HiOutlineGlobeAlt className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Global Scale
                  </h4>
                  <p className="text-slate-500 text-sm leading-snug">
                    Liquidity access across 120+ markets for instant deposits
                    and withdrawals.
                  </p>
                </div>
              </div>
            </div>

            {/* Final Convincer */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-blue-600/5 to-transparent border border-white/5 mb-12">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">
                "Our philosophy is built on three pillars: absolute security,
                relentless innovation, and measurable returns. Galaxy empowers
                you to invest like an institution, while maintaining the
                flexibility of a retail trader."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => navigate("/auth")}
                className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                Initialize My Portfolio
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-white/10 transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WelcomeGalaxy;
