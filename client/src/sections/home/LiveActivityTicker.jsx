import React from "react";
import { HiTrendingUp, HiExternalLink } from "react-icons/hi";

const activities = [
  { name: "Michael A.", action: "earned", amount: "$1,240" },
  { name: "Sarah K.", action: "withdrawn", amount: "$3,500" },
  { name: "Daniel O.", action: "earned", amount: "$890" },
  { name: "Grace M.", action: "earned", amount: "$2,140" },
  { name: "John D.", action: "withdrawn", amount: "$4,600" },
  { name: "Aisha B.", action: "earned", amount: "$760" },
];

const LiveActivityTicker = () => {
  return (
    // THICK INDIGO BASE: To match the new sophisticated theme
    <section className="bg-slate-900 py-5 overflow-hidden border-y border-white/10 shadow-2xl relative">
      
      {/* "LIVE" Indicator Label - Stay Fixed on the left */}
      <div className="absolute left-0 top-0 bottom-0 z-20 bg-slate-900 px-6 flex items-center border-r border-white/10 shadow-[20px_0_30px_rgba(15,23,42,1)]">
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Live Activity</span>
        </div>
      </div>

      <div className="relative w-full flex items-center">
        {/* The Scrolling Track */}
        <div className="flex animate-infinite-scroll whitespace-nowrap gap-6 pl-40">
          {[...activities, ...activities, ...activities].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-colors cursor-default group"
            >
              {/* Status Icon */}
              <div className={`p-1.5 rounded-full ${
                item.action === "earned" ? "bg-emerald-500/20 text-emerald-400" : "bg-indigo-500/20 text-indigo-400"
              }`}>
                {item.action === "earned" ? <HiTrendingUp className="w-4 h-4" /> : <HiExternalLink className="w-4 h-4" />}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium text-sm">{item.name}</span>
                <span className="text-white/60 text-xs uppercase font-bold tracking-tighter">
                    {item.action}
                </span>
                <span
                  className={`font-black text-base ${
                    item.action === "earned" ? "text-emerald-400" : "text-indigo-400"
                  }`}
                >
                  {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveActivityTicker;