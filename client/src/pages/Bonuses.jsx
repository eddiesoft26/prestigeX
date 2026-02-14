// src/pages/Bonuses.jsx
import React from "react";

const bonusesData = [
  {
    title: "Welcome Bonus",
    amount: "10% on First Deposit",
    description: "Kickstart your journey with an instant 10% bonus on your first investment.",
    icon: "🎁",
  },
  {
    title: "Referral Bonus",
    amount: "$50 per Friend",
    description: "Invite your friends and earn $50 for every successful referral.",
    icon: "🤝",
  },
  {
    title: "Loyalty Bonus",
    amount: "Up to 5% Monthly",
    description: "Rewarding long-term investors with extra monthly returns.",
    icon: "🏆",
  },
  {
    title: "Seasonal Promotions",
    amount: "Varies",
    description: "Special bonuses during holidays and market events to boost your profits.",
    icon: "🎉",
  },
];

const Bonuses = () => {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center px-6 py-24 md:py-32"
        style={{
          background: "linear-gradient(135deg, #FF8A00, #E52E71)", // vibrant gradient
          color: "white",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Exclusive Bonuses Just for You
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90">
            Boost your investment journey with our exciting and rewarding bonuses. Every step you take counts!
          </p>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bonusesData.map((bonus, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4">{bonus.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{bonus.title}</h3>
                <p className="text-blue-500 font-bold mb-2">{bonus.amount}</p>
                <p className="text-gray-600">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bonuses;
    