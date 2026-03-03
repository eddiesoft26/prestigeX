import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const AlphaIntelligence = () => {
  // 1. Destructure 'dataUpdatedAt' from useQuery
  const { data: sentiment, dataUpdatedAt } = useQuery({
    queryKey: ["market-sentiment"],
    queryFn: () => axios.get("https://api.alternative.me/fng/").then(res => res.data.data[0]),
    refetchInterval: 300000,
  });

  const sentimentValue = Number(sentiment?.value) || 50;
  const sentimentText = sentiment?.value_classification || "Analyzing...";

  // Helper to format the timestamp
  const formatTime = (ts) => {
    if (!ts) return "Syncing...";
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const LiveIndicator = () => (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">Live Feed</span>
      </div>
      {/* 2. Display the actual sync time */}
      <span className="text-[8px] font-bold text-slate-600 uppercase">
        Last Synced: {formatTime(dataUpdatedAt)}
      </span>
    </div>
  );

  return (
    <div className="space-y-10">
       <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/20">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Alpha Intelligence</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mt-2">Real-Time Institutional Analytics</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] relative">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-white font-black uppercase text-xs tracking-widest">Global Sentiment Index</h3>
               <LiveIndicator />
            </div>
            
            <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${sentimentValue}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className={`h-full shadow-[0_0_20px] ${
                   sentimentValue > 60 ? "bg-emerald-500 shadow-emerald-500/50" : 
                   sentimentValue < 40 ? "bg-red-500 shadow-red-500/50" : "bg-amber-500 shadow-amber-500/50"
                 }`} 
               />
            </div>

            <div className="flex justify-between mt-6 items-end">
                <div>
                  <p className="text-slate-500 text-[9px] font-black uppercase">Market Condition</p>
                  <p className="text-xl font-black text-white uppercase italic">{sentimentText}</p>
                </div>
                <p className="text-3xl font-black text-white font-mono">{sentimentValue}<span className="text-sm text-slate-500">/100</span></p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center relative">
            <div className="absolute top-10 right-10">
                <LiveIndicator />
            </div>
            
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">System Insight</p>
            <h4 className="text-white text-lg font-bold leading-tight">
              {sentimentValue > 70 
                ? "Market is in Extreme Greed. Consider securing profits in Real Estate assets." 
                : "Market accumulation detected. Institutional buy-walls are forming at current levels."}
            </h4>
          </div>
       </div>
    </div>
  );
};

export default AlphaIntelligence;