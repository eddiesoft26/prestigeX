import React from "react";
import {
  HiOutlineMicrophone,
  HiOutlineGlobeAlt,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

const CEOSpeach = () => {
  return (
    <section className="relative bg-[#020617] py-24 px-6 md:px-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT: Video Container with Styled Frame */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="relative group">
              {/* Outer Neon Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative aspect-video rounded-[2.2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  // Added playsinline=1 and origin to prevent app redirection
                  src={`https://www.youtube-nocookie.com/embed/v6v0rlUMGOI?si=iDeJuSI-7HHrzlXn&controls=1&rel=0&playsinline=1&origin=${window.location.origin}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Decorative "Recording" Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Official Briefing
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content & Caption */}
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <HiOutlineMicrophone className="text-blue-400 text-xl" />
              </div>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em]">
                Executive Address
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              A Vision for the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Digital Frontier.
              </span>
            </h2>

            <blockquote className="relative mb-10">
              <div className="absolute -left-4 top-0 text-6xl text-blue-500/20 font-serif">
                “
              </div>
              <p className="text-slate-300 text-xl font-medium leading-relaxed italic pl-4">
                Our CEO, Mikael Novogratz, responding to the future of our great
                company.
              </p>
            </blockquote>

            <div className="space-y-6 border-t border-white/5 pt-8">
              <div className="flex items-center gap-4">
                <HiOutlineGlobeAlt className="text-cyan-400 text-2xl" />
                <p className="text-slate-400 text-sm italic">
                  Global infrastructure expansion in data & AI energy.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlinePresentationChartLine className="text-indigo-400 text-2xl" />
                <p className="text-slate-400 text-sm italic">
                  Leading the charge in crypto legislation & adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSpeach;
