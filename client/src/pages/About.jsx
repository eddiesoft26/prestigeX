// src/pages/About.jsx
import React from "react";

const aboutFeatures = [
  {
    title: "Daily Profits",
    description:
      "Our team of expert crypto traders actively manages your assets, ensuring consistent daily returns.",
    icon: "💹",
  },
  {
    title: "Transparent Model",
    description:
      "We split profits 50/50 – you earn 50% of your investment profits, we reinvest the rest for sustainable growth.",
    icon: "🤝",
  },
  {
    title: "Secure Investments",
    description:
      "Your assets are stored safely with advanced security protocols, giving you peace of mind while we grow your wealth.",
    icon: "🔒",
  },
  {
    title: "Expert Team",
    description:
      "Our experienced traders and analysts use cutting-edge strategies to maximize returns while managing risk.",
    icon: "🧠",
  },
];

const About = () => {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32"
        style={{
          background: "linear-gradient(135deg, #00C6FF, #0072FF)", // premium blue gradient
          color: "white",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About OAKVEST
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6">
            We are a modern crypto investment company helping you grow your wealth through secure and profitable trading. Your success is our priority.
          </p>

          {/* Insurance Highlight */}
          <div className="bg-white/10 rounded-xl px-6 py-4 inline-block">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              $10M+
            </span>
            <span className="block text-sm sm:text-base md:text-lg text-white/80">
              Insurance & Asset Assurance
            </span>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            How We Work
          </h2>
          <p className="text-gray-600 mb-12">
            We trade with your assets professionally, generating daily profits. You receive 50% of the profits, while we reinvest 50% to grow our platform and maintain long-term sustainability.  
            This simple, transparent model ensures everyone benefits from our success.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Why Choose PrestigeX
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            We combine experience, security, and transparency to ensure your investments grow steadily. Our platform is designed for both beginners and seasoned investors who want to maximize their crypto potential.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full shadow-sm">
              Secure Trading
            </span>
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full shadow-sm">
              Daily Profits
            </span>
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full shadow-sm">
              Transparent Model
            </span>
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full shadow-sm">
              Expert Traders
            </span>
            <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full shadow-sm">
              $10M+ Asset Assurance
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
