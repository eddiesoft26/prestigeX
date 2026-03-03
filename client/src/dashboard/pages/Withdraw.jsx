import { useState, useRef } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import {
  HiOutlineWallet,
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../api/axios";
import toast, { Toaster } from "react-hot-toast"; // Added toast

const Withdraw = () => {
  const [coin, setCoin] = useState("btc");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topRef = useRef(null); // Reference for scrolling

  const navigate = useNavigate();

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: summaryData, isLoading: isSummaryLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: () => api.get("/dashboard/summary").then((res) => res.data),
    staleTime: Infinity,
  });

  const balance = isSummaryLoading ? 0 : summaryData?.withdrawableBalance;

  // Helper to ensure notifications are seen on mobile
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderBalance = (val) => {
    const parts = moneyFormatter.formatToParts(val);
    return (
      <div className="flex items-baseline font-mono tracking-tighter">
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.type === "currency"
                ? "text-xl text-indigo-400 mr-1 font-black"
                : part.type === "fraction"
                  ? "text-lg text-white/40 font-bold"
                  : "text-4xl font-black text-white"
            }
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!amount || !wallet) {
      scrollToTop();
      return toast.error("Please fill in all fields!"); // Replaced alert
    }
    if (parseFloat(amount) > balance) {
      scrollToTop();
      return toast.error("Insufficient funds for this extraction!"); // Replaced alert
    }

    setIsSubmitting(true);
    const withdrawalData = {
      coin,
      amount: parseFloat(amount),
      walletAddress: wallet,
    };

    try {
      const res = await api.post("/fiat/withdraw", withdrawalData);
      if (res.status === 201 || res.status === 200) {
        scrollToTop();
        toast.success("Settlement Executed. Awaiting Audit."); // Replaced alert
        setAmount("");
        setWallet("");
        setTimeout(() => navigate("/dashboard/payment-proof"), 2000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Protocol Error. Try again.";
      scrollToTop();
      toast.error(errorMessage); // Replaced alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={topRef} className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Global Toaster with Galaxy Theme */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 90,
        }}
        toastOptions={{
          style: {
            background: "#0F172A",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "11px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          },
          success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">
            Capital Release
          </h1>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase mt-1">
            Institutional Liquidity Terminal
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/2 border border-white/5 px-4 py-2 rounded-xl">
          <HiOutlineLockClosed className="text-indigo-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            End-to-End Encryption
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        {/* Left Column: Input Console */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0B0F19] to-indigo-950/30 border border-white/10 shadow-2xl overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>

            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Liquidity Available
              </p>
              <HiOutlineShieldCheck className="text-indigo-500/50" size={20} />
            </div>

            {renderBalance(balance)}

            <div className="mt-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                Settlement Engine: Ready
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {["btc", "eth"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCoin(type)}
                  className={`relative p-5 rounded-2xl border font-black uppercase text-xs tracking-widest transition-all duration-500 overflow-hidden ${
                    coin === type
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/20 scale-[1.02]"
                      : "bg-white/2 border-white/5 text-slate-500 hover:bg-white/5"
                  }`}
                >
                  {type === "btc" ? "Bitcoin Network" : "Ethereum Network"}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-6 pt-10 rounded-[2rem] bg-[#020617] border border-white/5 text-white font-mono text-2xl outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all"
                />
                <label className="absolute left-7 top-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Extraction Amount (USD)
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  placeholder="Paste destination address"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="w-full p-6 pt-10 rounded-[2rem] bg-[#020617] border border-white/5 text-indigo-400 font-mono text-xs outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all break-all"
                />
                <label className="absolute left-7 top-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Recipient Wallet Address
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full p-6 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Verifying Protocols..."
              ) : (
                <>
                  Execute Settlement <HiOutlineArrowNarrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activity Log */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/20 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-8 h-full">
          <p>Experience smooth withdrawal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
