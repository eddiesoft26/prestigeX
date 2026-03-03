import React, { useEffect, useRef } from 'react';

const LiveBitcoinChart = () => {
  const container = useRef();

  useEffect(() => {
    // Check if the script already exists to prevent duplicates on re-renders
    if (!document.getElementById('tradingview-widget-script')) {
      const script = document.createElement("script");
      script.id = 'tradingview-widget-script';
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com",
        // Custom Galaxy colors
        "backgroundColor": "rgba(2, 6, 23, 1)",
        "gridColor": "rgba(30, 41, 59, 0.3)",
        "hide_top_toolbar": false,
        "save_image": false,
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-[#020617] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Real-Time Market Data
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Bitcoin <span className="text-slate-500">Live Terminal</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Track global liquidity and price action directly from the Galaxy interface. 
            Our nodes synchronize with top-tier exchanges to provide sub-millisecond accuracy.
          </p>
        </div>

        {/* The Chart Container */}
        <div className="relative h-[500px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBitcoinChart;