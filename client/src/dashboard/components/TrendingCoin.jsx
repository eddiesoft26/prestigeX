const TrendingCoins = ({ coins }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Market Pulse</h3>
        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-lg italic">Live</span>
      </div>

      <div className="space-y-6">
        {coins?.slice(0, 6).map((coin) => (
          <motion.div 
            key={coin.item.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center justify-between group cursor-help"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/50 transition-all">
                <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div>
                <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{coin.item.symbol}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Trend Rank #{coin.item.score + 1}</p>
              </div>
            </div>
            <div className="text-right">
               <span className="text-[10px] bg-slate-800 text-slate-400 font-black px-2 py-1 rounded-md">
                 #{coin.item.market_cap_rank}
               </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
        Deep Market View
      </button>
    </div>
  );
};

export default TrendingCoins