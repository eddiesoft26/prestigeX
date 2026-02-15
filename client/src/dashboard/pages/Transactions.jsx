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

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading Statement...</div>;

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Transaction History</h2>
        <span className="text-xs font-bold text-gray-500 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {transactions?.length} Records
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="p-4">Type</th>
                <th className="p-4">Plan / Asset</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions?.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/1 transition-colors group">
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                      tx.type === 'INVESTMENT' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' : 'text-purple-400 border-purple-400/20 bg-purple-400/5'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-300">
                    {tx.plan}
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    {moneyFormatter.format(tx.amount)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === "Completed" ? "bg-green-400" : tx.status === "Pending" ? "bg-yellow-400" : "bg-red-400"
                      }`} />
                      <span className={`text-xs font-bold ${
                        tx.status === "Completed" ? "text-green-400" : tx.status === "Pending" ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-xs text-gray-500 font-mono">
                    {new Date(tx.date).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {transactions?.length === 0 && (
        <div className="text-center py-20 bg-white/1 rounded-2xl border border-dashed border-white/10">
          <p className="text-gray-500 text-sm italic">No financial activity recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
