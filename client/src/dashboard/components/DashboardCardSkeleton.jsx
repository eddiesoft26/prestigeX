import { HiCurrencyDollar, HiGift, HiUsers } from "react-icons/hi";

const DashboardCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div 
          key={item} 
          className="relative p-6 border rounded-2xl border-white/10 shadow-lg bg-[#0B0F19] overflow-hidden"
        >
          {/* Static Icon with low opacity to show position */}
          <div className="absolute right-5 top-5 text-slate-500/20">
            {item === 1 && <HiCurrencyDollar size={40} />}
            {item === 2 && <HiGift size={40} />}
            {item === 3 && <HiUsers size={40} />}
          </div>

          {/* Title Placeholder */}
          <div className="h-4 w-24 bg-slate-500 rounded-md mb-4"></div>
          
          {/* Amount/Value Placeholder */}
          <div className="h-8 w-32 bg-slate-500 rounded-lg mt-2"></div>

          {/* Footer/Status Badge Placeholder (Only for first card to match UI) */}
          {item === 1 && (
            <div className="mt-5 h-6 w-20 bg-slate-500/40 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCardsSkeleton;
