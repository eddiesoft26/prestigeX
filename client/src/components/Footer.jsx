import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0c0f14] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">Prestige INV</h3>
          <p className="text-sm leading-relaxed">
            Secure and intelligent digital investment solutions designed to help
            investors grow wealth consistently through advanced financial
            strategies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">
              Investment Plans
            </li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>

          <div className="flex gap-4 text-lg">
            <span className="bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white transition cursor-pointer">
              <FaTwitter />
            </span>
            <span className="bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white transition cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white transition cursor-pointer">
              <FaInstagram />
            </span>
            <span className="bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white transition cursor-pointer">
              <FaLinkedinIn />
            </span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} Prestige INV. All rights reserved.
      </div>
      <p className="px-4 py-5">
        <span className="text-brand-loss">Risk Warning:</span> Cryptocurrency trading carries inherent risks due to market
        volatility and leverage. Investments may result in partial or total loss
        of capital. However, by investing with PrestigeX, you benefit from
        professional risk management tools, secure portfolio strategies, and
        transparent monitoring, helping you make informed decisions and protect
        your investments. At PrestigeX, we provide educational resources,
        real-time analytics, and automated strategies to support your investment
        journey. While no investment is entirely risk-free, our platform is
        designed to guide you safely and confidently in the crypto market.
      </p>
    </footer>
  );
};

export default Footer;
