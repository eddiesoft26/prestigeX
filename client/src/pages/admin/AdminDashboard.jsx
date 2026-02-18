import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAuth } from "../../context/AuthContext";
import CreateWallet from "./pages/CreateWallet";
import ListInvestments from "./pages/ListInvestments";
import ListWithdrawals from "./pages/ListWithdrawals";
import ListUsers from "./pages/ListUsers";

const AdminLayout = () => {
  // 1. These are the "missing" variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#0E1013]">
      {/* 2. Pass the variables to the Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
      />

      <div className="flex-1 flex flex-col lg:ml-72">
        {" "}
        {/* Added margin to clear the fixed sidebar */}
        {/* 3. Pass only the "Setter" to the Navbar so it can open the sidebar */}
        <AdminNavbar setIsSidebarOpen={setIsSidebarOpen} user={user} />
        <main className="p-6">
          {/* content based on activeTab */}
          {activeTab === "create-wallets" && <CreateWallet />}
          {activeTab === "users" && <ListUsers />}
          {activeTab === "investments" && <ListInvestments />}
          {activeTab === "withdrawals" && <ListWithdrawals />}  
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
