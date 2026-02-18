import { useState } from "react";
import { HiOutlineSave, HiOutlineQrcode, HiOutlineGlobe } from "react-icons/hi";
import { toast } from "react-hot-toast"; // Recommended for feedback

const CreateWallet = () => {
  const [formData, setFormData] = useState({
    coinName: "",
    walletAddress: "",
    network: "ERC20", // Default network
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Endpoint logic based on your adminWallets.routes.js
      // await api.post("/admin-wallets/create", formData);
      console.log(formData)
      toast.success(`${formData.coinName} Wallet Updated!`);
      setFormData({ coinName: "", walletAddress: "", network: "ERC20" });
    } catch (err) {
      toast.error("Failed to update wallet");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Wallet <span className="text-amber-500">Configuration</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">Configure global receiving addresses for investor deposits.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="bg-[#1A1D21] border border-white/5 p-8 rounded-[2rem] space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
                Asset Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bitcoin or USDT"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all font-medium"
                value={formData.coinName}
                onChange={(e) => setFormData({ ...formData, coinName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
                Network Type
              </label>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all font-medium appearance-none"
                value={formData.network}
                onChange={(e) => setFormData({ ...formData, network: e.target.value })}
              >
                <option value="ERC20">ERC20</option>
                <option value="TRC20">TRC20 (Tron)</option>
                <option value="BEP20">BEP20 (BSC)</option>
                <option value="BTC">Native Bitcoin</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
                Wallet Address
              </label>
              <textarea
                placeholder="Paste the public address here"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all font-mono text-sm resize-none h-24"
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Syncing..." : <><HiOutlineSave size={20} /> Deploy Wallet</>}
          </button>
        </form>

        {/* PREVIEW CARD */}
        <div className="bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/10 p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden">
          <HiOutlineQrcode className="absolute -right-10 -bottom-10 text-white/5" size={250} />
          
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-amber-500 rounded-2xl text-black">
                  <HiOutlineGlobe size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-tighter">Live Preview</p>
                  <h4 className="text-white font-bold uppercase">{formData.coinName || "Asset Name"}</h4>
               </div>
            </div>

            <div className="space-y-4 relative z-10">
               <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Current Address</p>
                  <p className="text-sm font-mono text-slate-300 break-all bg-black/40 p-3 rounded-lg mt-1 border border-white/5">
                    {formData.walletAddress || "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
                  </p>
               </div>
               <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <p className="text-[10px] font-bold text-white">Network: {formData.network}</p>
               </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
             <p className="text-[10px] text-slate-500 italic">
               * Once deployed, this address will be visible to all users in the Deposit section.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;