// src/pages/InvestmentPlans.jsx

import InvestmentPlans from "../sections/home/InvestmentPlans";

const Plans = () => {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center px-6 py-20 md:py-32"
        style={{
          background: "linear-gradient(135deg, #6C63FF, #00D4FF)", // unique gradient for hero
          color: "white",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Take Your Investments to the Next Level
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90">
            Explore our plans and start growing your wealth safely and efficiently.
            Investing has never been easier.
          </p>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="bg-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InvestmentPlans/>
        </div>
      </section>
    </main>
  );
};

export default Plans;
