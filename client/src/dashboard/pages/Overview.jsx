
import DashboardCards from "../components/DashboardCards";
import TrendingCoins from "../components/TrendingCoin";

// dashboard/pages/Overview.jsx
const Overview = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-9">
        <DashboardCards />
      </div>

      <div className="col-span-12 xl:col-span-3">
        <TrendingCoins />
      </div>
    </div>
  );
};

export default Overview;
