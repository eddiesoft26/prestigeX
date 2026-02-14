// dashboard/components/DashboardCards.jsx
import {
  HiCurrencyDollar,
  HiGift,
  HiUsers,
  HiTrendingUp,
  HiTrendingDown,
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
  console.log(data)

  const getStatus = (amount) => {
    if (amount < 1000) return { label: "Low Prtfolio", color: "bg-red-500" };
    if (amount < 10000)
      return { label: "Growing Portfolio", color: "bg-yellow-500" };
    return { label: "Strong Portfolio", color: "bg-green-500" };
  };

  const rawAssets = data?.totalAssets;

  const status = getStatus(rawAssets);


  // HELPER: Splits "$1,250.00" into styled spans
  const renderFormattedBalance = (amount, sizeClass = "text-3xl") => {
    const parts = formatAmount.formatToParts(amount ?? 0);
    return (
      <div className="flex items-baseline font-mono tracking-tighter">
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.type === "currency"
                ? "text-sm md:text-base font-medium text-gray-500 mr-1" // Small Symbol
                : part.type === "fraction"
                  ? "text-lg font-bold text-white/60" // Small Cents/Kobo
                  : `${sizeClass} font-extrabold text-white` // Main Numbers
            }
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. TOTAL ASSETS CARD */}
      <div className="relative p-6 border rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden group">
        <HiCurrencyDollar
          size={42}
          className="absolute -right-2 -top-2 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-500"
        />

        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Total Assets
          </h4>
          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/10">
            USD
          </span>
        </div>

        {renderFormattedBalance(data?.totalAssets)}

        {/* Pro-Tip: Glassmorphism Status Badge */}
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full border ${status.color.replace("bg-", "border-").replace("500", "500/50")} ${status.color.replace("bg-", "bg-").replace("500", "500/10")} text-white`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.color}`}
            ></div>
            {status.label}
          </span>
        </div>
      </div>

      {/* 2. WELCOME BONUS CARD */}
      <div className="relative p-6 border rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden">
        <HiGift
          size={40}
          className="absolute right-5 top-5 text-indigo-500/40"
        />
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          Welcome Bonus
        </h4>
        {renderFormattedBalance(data?.welcomeBonus, "text-2xl")}
        <p className="text-[10px] text-indigo-400 mt-2 font-medium italic">
          Active on first deposit
        </p>
      </div>

      {/* 3. REFERRALS CARD */}
      <div className="relative p-6 border rounded-2xl border-white/10 shadow-xl bg-[#0B0F19] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Growth & Network
          </h4>
          <HiUsers size={24} className="text-emerald-500/60" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-r border-white/5">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
              Earned
            </p>
            {renderFormattedBalance(data?.referralBonus, "text-xl")}
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
              Network
            </p>
            <p className="text-xl font-extrabold text-white font-mono">
              {data?.referralsCount ?? 0}{" "}
              <span className="text-[10px] font-medium text-gray-500">
                Users
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
