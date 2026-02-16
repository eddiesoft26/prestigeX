// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import ScrollReveal from "../../components/ScrollAnimation";
import RecentActivityToast from "../../components/RecentActivityTicker";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const { openAuthModal } = useAuth();
  return (
    <ScrollReveal className=" relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
      >
        <source src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771155339/hero_bg_hqyidj.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient for readability */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40
"
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl px-4 text-white flex flex-col items-center gap-6">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif leading-tight animate-fadeIn">
          Prestige Meets Performance.
        </h1>

        {/* Subtext with typing animation */}
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-medium justify-center gap-2 animate-fadeIn delay-200">
          <span className="block">
            Experience a new standard in crypto investment{" "}
          </span>
          {/* Animated part */}
          <TypeAnimation
            sequence={[
              "for secure, reliable", // first part
              2000,
              "",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-blue-500 font-semibold"
          />

          {/* Responsive line break for mobile */}
          <span className="block sm:inline"> investors.</span>
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fadeIn delay-400">
          <Link to="/auth?mode=register">
          <button
            className="px-8 py-3 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            Register
          </button>
          </Link>
          <Link to="/auth?mode=login">
          <button
            onClick={() => openAuthModal("register")}
            className="px-8 py-3 cursor-pointer border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Login
          </button>
          </Link>
        </div>

        {/* Optional secondary call-to-action */}
        <p className="text-gray-400 text-sm mt-4 animate-fadeIn delay-600">
          Already have an account? Simply click login to continue investing.
        </p>
      </div>
      <RecentActivityToast />
      {/* Decorative floating dots */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-50 top-10 left-20"></div>
        <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-40 top-1/3 left-3/4"></div>
        <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-30 bottom-20 right-1/4"></div>
      </div>
    </ScrollReveal>
  );
};

export default Hero;
