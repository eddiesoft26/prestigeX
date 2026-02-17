// dashboard/components/DashboardCards.jsx
import {
  HiCurrencyDollar,
  HiGift,
  HiUsers,
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";

import api from "../../api/axios";
import DashboardCardsSkeleton from "./DashboardCardSkeleton";

const DashboardCards = () => {
  const formatAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: () => api.get("/dashboard/summary").then((res) => res.data),
    staleTime: 60000,
  });

  if (isLoading) return <DashboardCardsSkeleton />;

  const getStatus = (amount) => {
    if (amount < 1000) return { label: "Low", color: "bg-red-500" };
    if (amount < 10000) return { label: "Growing", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const status = getStatus(data?.totalAssets || 0);

  // HELPER: Splits "$1,250.00" into styled spans (Optimized for Mobile Row)
  const renderFormattedBalance = (amount, sizeClass = "text-xl md:text-3xl") => {
    const parts = formatAmount.formatToParts(amount ?? 0);
    return (
      <div className="flex items-baseline font-mono tracking-tighter overflow-hidden">
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.type === "currency"
                ? "text-[8px] md:text-base font-medium text-gray-500 mr-0.5" 
                : part.type === "fraction"
                  ? "hidden md:inline-block text-lg font-bold text-white/60" // Hide cents on mobile to save space
                  : `${sizeClass} font-extrabold text-white` 
            }
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  };

  return (
    /* Changed grid-cols-1 to grid-cols-3 for mobile row view */
    <div className="grid grid-cols-3 gap-2 md:gap-6">
      
      {/* 1. TOTAL ASSETS CARD */}
      <div className="relative p-3 md:p-6 border rounded-xl md:rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden group">
        <HiCurrencyDollar
          className="absolute -right-1 -top-1 md:-right-2 md:-top-2 text-blue-500/20 text-xl md:text-5xl"
        />
        <div className="flex justify-between items-start mb-1 md:mb-4">
          <h4 className="text-[7px] md:text-xs font-bold text-gray-500 uppercase tracking-widest truncate">
            Assets
          </h4>
        </div>
        {renderFormattedBalance(data?.totalAssets)}
        <div className="mt-2 md:mt-5 flex items-center gap-1">
          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full animate-pulse ${status.color}`}></div>
          <span className="text-[6px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
            {status.label}
          </span>
        </div>
      </div>

      {/* 2. WELCOME BONUS CARD */}
      <div className="relative p-3 md:p-6 border rounded-xl md:rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden">
        <HiGift
          className="absolute right-2 top-2 md:right-5 md:top-5 text-indigo-500/40 text-lg md:text-4xl"
        />
        <h4 className="text-[7px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 md:mb-4">
          Bonus
        </h4>
        {renderFormattedBalance(data?.welcomeBonus, "text-lg md:text-2xl")}
        <p className="text-[6px] md:text-[10px] text-indigo-400 mt-1 font-medium italic truncate">
          First Dep.
        </p>
      </div>

      {/* 3. REFERRALS CARD */}
      <div className="relative p-3 md:p-6 border rounded-xl md:rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden">
        <div className="flex justify-between items-center mb-1 md:mb-4">
          <h4 className="text-[7px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
            Network
          </h4>
          <HiUsers className="text-emerald-500/60 text-xs md:text-2xl" />
        </div>
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="md:border-r border-white/5 pr-2">
            {renderFormattedBalance(data?.referralBonus, "text-base md:text-xl")}
          </div>
          <div className="hidden md:block">
            <p className="text-xl font-extrabold text-white font-mono">
              {data?.referralsCount ?? 0}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardCards;