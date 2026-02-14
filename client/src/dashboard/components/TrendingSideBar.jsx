import { useEffect, useState } from "react";
import axios from "axios";

const TrendingSidebar = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await axios.get("https://api.coingecko.com/api/v3/search/trending");
      setCoins(res.data.coins);
    };

    fetchTrending();
  }, []);

  return (
    <div className="hidden lg:block w-60 p-4 border-r border-white/10">
      <h3 className="font-semibold mb-4">Trending Crypto</h3>

      <div className="space-y-3">
        {coins.map((coin) => (
          <div key={coin.item.id} className="flex justify-between">
            <span>{coin.item.symbol}</span>
            <span className="text-sm text-gray-400">
              Rank #{coin.item.market_cap_rank}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
