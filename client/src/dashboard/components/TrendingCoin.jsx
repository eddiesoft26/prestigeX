import { useEffect, useState } from "react";
import axios from "axios";

const TrendingCoins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        setCoins(res.data.coins);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <h3 className="font-semibold mb-4">Trending Coins</h3>

      <div className="space-y-3">
        {coins.map((coin) => (
          <div
            key={coin.item.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={coin.item.small}
                alt={coin.item.name}
                className="w-6 h-6"
              />
              <span>{coin.item.symbol}</span>
            </div>

            <span className="text-sm text-gray-400">
              Rank #{coin.item.market_cap_rank}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
