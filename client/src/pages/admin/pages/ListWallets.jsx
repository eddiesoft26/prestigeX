import { useEffect, useState } from "react";
import {
  HiOutlineGlobe,
  HiOutlineDatabase,
  HiOutlineRefresh,
} from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../api/axios";

const WalletDirectory = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/wallets");
      // res.data is expected to be an Array []
      console.log(res.data);
      setWallets(res.data);
    } catch (err) {
      console.log("Status Code:", err.response?.status);
      console.log("Status Code:", err.response?.data?.details);

      // This will log the error message from your backend
      console.log("Server Message:", err.response?.data?.message);

      // This logs the whole error if it's a network issue
      console.error("Full Axios Error:", err);
      toast.error("Failed to sync wallet directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <Toaster position="top-right" />

      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Active <span className="text-amber-500">Gateways</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Verified addresses currently visible to investors for deposits.
          </p>
        </div>
        <button
          onClick={fetchWallets}
          disabled={loading}
          className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-amber-500 transition-all"
        >
          <HiOutlineRefresh
            className={loading ? "animate-spin" : ""}
            size={20}
          />
        </button>
      </div>

      {/* DIRECTORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Simple Skeleton Loader
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-white/5 animate-pulse rounded-[2rem] border border-white/5"
            ></div>
          ))
        ) : wallets.length > 0 ? (
          wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="bg-[#1A1D21] border border-white/5 p-6 rounded-[2rem] hover:border-amber-500/30 transition-all group relative overflow-hidden"
            >
              <HiOutlineDatabase
                className="absolute -right-6 -bottom-6 text-white/5"
                size={120}
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  <HiOutlineGlobe size={20} />
                </div>
                <h4 className="text-white font-black uppercase tracking-wider">
                  {wallet.coin}
                </h4>
              </div>

              <div className="space-y-3 relative z-10">
                {/* <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Network
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Global Mainnet
                  </p>
                </div> */}
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Receiving Address
                  </p>
                  <p className="text-[11px] font-mono text-amber-500/80 break-all bg-black/40 p-3 rounded-xl mt-1 border border-white/5">
                    {wallet.address}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
            <p className="text-slate-600 italic">
              No payment gateways are currently configured.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDirectory;
