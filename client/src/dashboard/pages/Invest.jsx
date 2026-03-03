import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineDuplicate,
  HiCheck,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
} from "react-icons/hi";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";

const plans = [
  {
    id: 1,
    name: "Starter Plan",
    min: 100,
    max: 999,
    roi: "20%",
    duration: "24hrs",
    color: "from-blue-500/20",
  },
  {
    id: 2,
    name: "Premium Plan",
    min: 1000,
    max: 4999,
    roi: "35%",
    duration: "48hrs",
    color: "from-indigo-500/20",
  },
  {
    id: 3,
    name: "Pro Plan",
    min: 5000,
    max: 9999,
    roi: "50%",
    duration: "72hrs",
    color: "from-purple-500/20",
  },
  {
    id: 4,
    name: "Ultimate Plan",
    min: 10000,
    max: 1000000,
    roi: "60%",
    duration: "96hrs",
    color: "from-emerald-500/20",
  },
];

const localWallets = {
  btc: "1KeSLk5iZ7e5yxb451fwoE1ZL9BeEsKZsa",
  eth: "0xE127105e2cC0F3E661bD8908D7D500f9f18AA8d5",
};

const Invest = () => {
  const [coin, setCoin] = useState("btc");
  const [investmentType, setInvestmentType] = useState("CRYPTO");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null); // Reference for scrolling

  const navigate = useNavigate();
  const wallets = localWallets;

  // Helper to ensure user sees notifications on mobile
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReview = () => {
    if (!investmentType) {
      scrollToTop();
      return toast.error("Please select an investment type!");
    }

    if (!selectedPlan) {
      scrollToTop();
      return toast.error("Please select a plan!");
    }
    const numAmount = Number(amount);
    if (numAmount < selectedPlan.min) {
      scrollToTop();
      return toast.error(
        `Minimum for ${selectedPlan.name} is $${selectedPlan.min}`,
      );
    }
    if (numAmount > selectedPlan.max) {
      scrollToTop();
      return toast.error(
        `Maximum for ${selectedPlan.name} is $${selectedPlan.max}. Select a higher plan.`,
      );
    }

    // Success: Scroll up and show modal
    scrollToTop();
    setIsModalOpen(true);
  };

  const confirmInvestment = async () => {
    setIsSubmitting(true);
    const numAmount = Number(amount);
    const roiDecimal = parseFloat(selectedPlan.roi) / 100;
    const calculatedProfit = numAmount * roiDecimal;

    const investmentData = {
      plan: selectedPlan.name.split(" ")[0].toUpperCase(),
      amount: numAmount,
      roiPercent: parseFloat(selectedPlan.roi),
      profit: calculatedProfit,
      totalPayout: numAmount + calculatedProfit,
      coin: coin.toUpperCase(),
      investmentType,
    };

    try {
      const res = await api.post("/fiat/invest", investmentData);
      if (res.status === 201) {
        toast.success("Investment Deployment Initiated!");
        setIsModalOpen(false);
        navigate("/dashboard/payment-proof");
      }
    } catch (error) {
      scrollToTop();
      toast.error(
        error.response?.data?.message || "Connection error. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    /* ATTACH REF HERE */
    <div ref={topRef} className="max-w-4xl mx-auto space-y-10 pb-20">
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
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic text-left uppercase">
            Asset Deployment
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 text-left">
            Select your strategy & deposit funds
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-2 self-start">
          <HiOutlineShieldCheck className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase">
            End-to-End Encrypted
          </span>
        </div>
      </div>

      {/* NEW: INVESTMENT TYPE TOGGLE SECTION */}
      <div className="bg-slate-900/40 border border-white/5 p-2 rounded-3xl inline-flex self-start">
        <button
          onClick={() => setInvestmentType("CRYPTO")}
          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${investmentType === "CRYPTO" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:text-white"}`}
        >
          <HiOutlineCurrencyDollar size={16} /> Crypto investment
        </button>
        <button
          onClick={() => setInvestmentType("REAL_ESTATE")}
          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${investmentType === "REAL_ESTATE" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:text-white"}`}
        >
          <HiOutlineHome size={16} /> Real Estate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Step 01. Select Asset
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCoin("btc")}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 ${coin === "btc" ? "border-orange-500/50 bg-orange-500/5" : "border-white/5 bg-white/2"}`}
              >
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <SiBitcoin
                    className={`text-3xl ${coin === "btc" ? "text-orange-500" : "text-slate-600"}`}
                  />
                  <span
                    className={`text-xs font-black uppercase ${coin === "btc" ? "text-white" : "text-slate-500"}`}
                  >
                    Bitcoin
                  </span>
                </div>
              </button>
              <button
                onClick={() => setCoin("eth")}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 ${coin === "eth" ? "border-blue-500/50 bg-blue-500/5" : "border-white/5 bg-white/2"}`}
              >
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <SiEthereum
                    className={`text-3xl ${coin === "eth" ? "text-blue-500" : "text-slate-600"}`}
                  />
                  <span
                    className={`text-xs font-black uppercase ${coin === "eth" ? "text-white" : "text-slate-500"}`}
                  >
                    Ethereum
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Step 02. Choose Strategy
            </p>
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${selectedPlan?.id === plan.id ? "border-indigo-500 bg-indigo-500/5" : "border-white/5 bg-white/2 hover:border-white/20"}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4
                        className={`text-sm font-black tracking-tight ${selectedPlan?.id === plan.id ? "text-white" : "text-slate-300"}`}
                      >
                        {plan.name}
                      </h4>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">
                          Min: ${plan.min.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase">
                          ROI: {plan.roi}
                        </span>
                      </div>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <HiCheck className="text-indigo-500 text-xl" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 text-left">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Step 03. Entry Amount
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xl outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {selectedPlan && amount && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase">
                      Est. Profit
                    </span>
                    <span className="text-emerald-400 font-black">
                      $
                      {(
                        Number(amount) *
                        (parseFloat(selectedPlan.roi) / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase">
                      Total Return
                    </span>
                    <span className="text-white font-black">
                      $
                      {(
                        Number(amount) +
                        Number(amount) * (parseFloat(selectedPlan.roi) / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleReview}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] transition-all"
              >
                Review Deployment
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#0B0F19] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-blue-600" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <HiOutlineLightningBolt className="text-indigo-500 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white italic leading-none">
                    Make payment to the genrated wallet and comfirm payment
                  </h3>
                  <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase mt-2">
                    TX-REF: #TX-{Math.floor(Math.random() * 90000)}
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-white/2 border border-white/5 rounded-3xl p-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">
                    Plan
                  </span>
                  <span className="text-white font-black">
                    {selectedPlan?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">
                    Amount
                  </span>
                  <span className="text-white font-black">
                    ${Number(amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">
                    Asset
                  </span>
                  <span className="text-orange-500 font-black">
                    {coin.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Deposit Address ({coin.toUpperCase()})
                </label>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <p className="break-all font-mono text-[11px] font-black text-indigo-400">
                    {wallets[coin]}
                  </p>
                  <button
                    onClick={() => handleCopy(wallets[coin])}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/5"
                  >
                    {copied ? (
                      <HiCheck className="text-emerald-500" />
                    ) : (
                      <HiOutlineDuplicate />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-4 rounded-2xl border border-white/5 text-slate-500 font-black uppercase tracking-widest text-[10px]"
                >
                  Back
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={confirmInvestment}
                  className="py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] disabled:opacity-50"
                >
                  {isSubmitting ? "Syncing..." : "I have paid"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Invest;
