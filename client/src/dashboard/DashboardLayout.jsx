import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Outlet } from "react-router-dom";

import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";
import MobileSidebar from "./components/MobileSidebar";
import DashboardLayoutSkeleton from "../components/DashboardLayoutSkeleton";


const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

   const { data: summary, isLoading, error } = useQuery({
    queryKey: ['summary'],
    queryFn: () => api.get('/dashboard/summary').then(res => res.data),
    staleTime: 60000, // Consider data fresh for 1 minute
  });

  if (isLoading) return <DashboardLayoutSkeleton />;
  // if (error) return <ErrorMessage message="Failed to load balance" />;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <DashboardNavbar setMobileOpen={setMobileOpen} />

      <MobileSidebar open={mobileOpen} setOpen={setMobileOpen}/>

      <div className="flex overflow-hidden">
        <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 min-w-0 w-full p-6 space-y-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
