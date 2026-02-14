import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
);

const BtcChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1",
      );

      const prices = res.data.prices;

      setChartData({
        labels: prices.map((p) => new Date(p[0]).toLocaleTimeString()),
        datasets: [
          {
            label: "BTC Price",
            data: prices.map((p) => p[1]),
            borderWidth: 2,
            fill: false,
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="w-full h-100 p-4 rounded-2xl bg-white/5 border border-white/10">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#e5e7eb", // light text
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#cbd5e1",
              },
              grid: {
                color: "rgba(255,255,255,0.08)",
              },
            },
            y: {
              ticks: {
                color: "#cbd5e1",
              },
              grid: {
                color: "rgba(255,255,255,0.08)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BtcChart;
