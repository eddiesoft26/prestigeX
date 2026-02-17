import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { HiOutlineDocumentText, HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";

const Transactions = () => {
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => api.get("/fiat/transactions").then((res) => res.data),
  });

  if (isLoading)
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Synchronizing Ledger...</p>
      </div>
    );

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Financial <span className="text-slate-500">Ledger</span>
          </h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Audit-ready transaction records</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest transition-all">
                Export CSV
            </button>
            <span className="text-[9px] font-black text-indigo-400 uppercase bg-indigo-500/5 px-3 py-2 rounded-xl border border-indigo-500/10 tracking-widest">
                {transactions?.length || 0} Entries
            </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-[2rem] border border-white/5 bg-[#0B0F19]/50 backdrop-blur-xl shadow-2xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 border-b border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="p-6 whitespace-nowrap">Origin / Type</th>
                <th className="p-6 whitespace-nowrap">Allocation</th>
                <th className="p-6 whitespace-nowrap">Valuation (USD)</th>
                <th className="p-6 whitespace-nowrap">Status</th>
                <th className="p-6 text-right whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {transactions?.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-indigo-500/[0.02] transition-colors group"
                >
                  {/* Type Column */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        tx.type === "INVESTMENT" 
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                        : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                      }`}>
                        {tx.type === "INVESTMENT" ? <HiOutlineArrowDownLeft size={14}/> : <HiOutlineArrowUpRight size={14}/>}
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-wider">
                        {tx.type}
                      </span>
                    </div>
                  </td>

                  {/* Plan/Asset */}
                  <td className="p-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300 whitespace-nowrap">{tx.plan || "Market Asset"}</span>
                        <span className="text-[9px] font-medium text-slate-600 uppercase tracking-tighter">REF: {tx.id?.slice(-8).toUpperCase() || "N/A"}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-6 whitespace-nowrap">
                    <span className="text-sm font-black text-white font-mono tracking-tighter">
                      {moneyFormatter.format(tx.amount)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                      tx.status === "Completed" ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" :
                      tx.status === "Pending" ? "text-amber-400 border-amber-400/20 bg-amber-400/5" :
                      "text-red-400 border-red-400/20 bg-red-400/5"
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${
                        tx.status === "Completed" ? "bg-emerald-400 shadow-[0_0_5px_#10b981]" :
                        tx.status === "Pending" ? "bg-amber-400 shadow-[0_0_5px_#f59e0b]" :
                        "bg-red-400 shadow-[0_0_5px_#ef4444]"
                      }`} />
                      {tx.status}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-6 text-right whitespace-nowrap">
                    <span className="text-[10px] text-slate-500 font-bold font-mono">
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                      })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {transactions?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-900/10 rounded-[2rem] border border-dashed border-white/5">
          <HiOutlineDocumentText size={40} className="text-slate-700 mb-4" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            No financial activity recorded
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;