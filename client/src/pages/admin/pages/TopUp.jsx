import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import { HiOutlinePlusCircle, HiSearch, HiUserCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast

const TopUp = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => api.get("/admin/users").then((res) => res.data),
  });

  // 2. Refined Mutation with Toasts
  const mutation = useMutation({
    mutationFn: (data) => api.post("/admin/topup", data),
    onMutate: () => {
      // Optional: show a loading toast immediately
      toast.loading("Processing injection...", { id: "topup-toast" });
    },
    onSuccess: () => {
      toast.success("Capital injected successfully!", { id: "topup-toast" });
      setAmount("");
      setSelectedUser(null);
      queryClient.invalidateQueries(["adminUsers"]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to process top-up";
      toast.error(msg, { id: "topup-toast" });
    },
  });

  const handleTopUp = () => {
    if (!selectedUser) return toast.error("Please select a user first");
    if (!amount || amount <= 0) return toast.error("Enter a valid amount");
    
    mutation.mutate({ userId: selectedUser.id, amount });
  };

  const filteredUsers = users?.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <Toaster position="top-right" reverseOrder={false} /> {/* 3. Toast Container */}
      
      <div>
        <h1 className="text-3xl font-black text-white italic">CAPITAL INJECTION</h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Add manual funds to investor accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: User List */}
        <div className="bg-[#1A1D21] border border-white/5 rounded-[2rem] p-6 space-y-4">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 text-sm text-white outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {loadingUsers ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
            ) : (
              filteredUsers?.map(user => (
                <div 
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    selectedUser?.id === user.id ? "bg-blue-600 border-blue-400" : "bg-white/2 border-white/5 hover:border-white/20"
                  }`}
                >
                  <p className="text-sm font-bold text-white">{user.fullName}</p>
                  <p className="text-[10px] text-slate-400 uppercase">{user.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Action Area */}
        <div className="bg-white/2 border border-white/5 rounded-[2rem] p-8">
          {selectedUser ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Injection Amount ($)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white font-black text-2xl outline-none focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* 4. Button with Loading State */}
              <button 
                onClick={handleTopUp}
                disabled={mutation.isPending}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black group-hover:border-white"></div>
                    Processing...
                  </>
                ) : (
                  "Confirm Injection"
                )}
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 italic text-sm">
              Select a user from the list to begin injection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUp;