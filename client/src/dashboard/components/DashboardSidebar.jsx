import TrendingSidebar from "./TrendingSideBar";

// dashboard/components/DashboardSidebar.jsx
const DashboardSidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`bg-black/50 border-r border-white/10 transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} hidden md:block`}
    >
      <div className="p-4">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 text-sm text-gray-300"
        >
          Toggle
        </button>

        <h3 className="text-sm text-gray-400 mb-3">Trending Crypto</h3>

        <TrendingSidebar />

        <button className="mt-8 text-gray-300">Settings</button>

      </div>
    </aside>
  );
};

export default DashboardSidebar;
