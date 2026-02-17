import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";
import MobileSidebar from "./components/MobileSidebar";
import DashboardLayoutSkeleton from "../components/DashboardLayoutSkeleton";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Your existing Query logic - keeping it efficient
  const { data: summary, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: () => api.get('/dashboard/summary').then(res => res.data),
    staleTime: 60000, 
  });

  if (isLoading) return <DashboardLayoutSkeleton />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <DashboardNavbar setMobileOpen={setMobileOpen} user={summary?.user} />
      <MobileSidebar open={mobileOpen} setOpen={setMobileOpen} />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 min-w-0 w-full overflow-y-auto custom-scrollbar bg-slate-950/30 backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
             {/* Pass summary down to all child pages via context */}
             <Outlet context={{ summary }} />
          </div>
        </main>
      </div>

      {/* Enterprise Status Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[#020617]/90 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                  Nodes Active
              </span>
              <span className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Real Estate Division: <span className="text-indigo-400">Online</span>
              </span>
          </div>
          <div className="text-[10px] font-black text-slate-600 uppercase tracking-tighter italic">
              PrestigeX Quantum Security Layer v4.0
          </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;