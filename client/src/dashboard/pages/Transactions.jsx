import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

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
      <div className="p-10 text-center animate-pulse">Loading Statement...</div>
    );

  return (
    // Add 'overflow-x-hidden' to the main wrapper to kill the page slide
    <div className="p-4 space-y-6 max-w-6xl mx-auto overflow-x-hidden w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Transaction History
        </h2>
        <span className="text-xs font-bold text-gray-500 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {transactions?.length} Records
        </span>
      </div>
      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-2xl">
        {/* This 'w-full' and 'overflow-x-auto' combo is the key */}
        <div className="w-full overflow-x-auto">
          {/* min-w-max prevents columns from collapsing, forcing the scroll inside THIS div */}
          <table className="w-full text-left min-w-175">
            <thead>
              <tr className="bg-white/2 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {/* Add 'whitespace-nowrap' to th and td tags to keep them tidy */}
                <th className="p-4 whitespace-nowrap">Type</th>
                <th className="p-4 whitespace-nowrap">Plan / Asset</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 text-right whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions?.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-white/1 transition-colors group"
                >
                  {/* Type - Hide some padding on mobile */}
                  <td className="p-3 md:p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                        tx.type === "INVESTMENT"
                          ? "text-blue-400 border-blue-400/20 bg-blue-400/5"
                          : "text-purple-400 border-purple-400/20 bg-purple-400/5"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>

                  {/* Plan - Use whitespace-nowrap to prevent text wrapping weirdly */}
                  <td className="p-3 md:p-4 text-sm font-semibold text-gray-300 whitespace-nowrap">
                    {tx.plan}
                  </td>

                  <td className="p-3 md:p-4 font-mono font-bold text-white whitespace-nowrap">
                    {moneyFormatter.format(tx.amount)}
                  </td>

                  <td className="p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          tx.status === "Completed"
                            ? "bg-green-400"
                            : tx.status === "Pending"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold ${
                          tx.status === "Completed"
                            ? "text-green-400"
                            : tx.status === "Pending"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 md:p-4 text-right text-[10px] text-gray-500 font-mono whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {transactions?.length === 0 && (
        <div className="text-center py-20 bg-white/1 rounded-2xl border border-dashed border-white/10">
          <p className="text-gray-500 text-sm italic">
            No financial activity recorded yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
