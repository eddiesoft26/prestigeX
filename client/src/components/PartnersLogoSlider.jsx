import React from "react";
import {
  SiBitcoin,
  SiEthereum,
  SiBinance,
  SiCoinbase,
  SiVisa,
  SiMastercard,
} from "react-icons/si";

const partners = [
  SiBitcoin,
  SiEthereum,
  SiBinance,
  SiCoinbase,
  SiVisa,
  SiMastercard,
];

const PartnerLogoSlider = () => {
  return (
    <div className="w-full overflow-hidden py-14 mt-20 border-t border-gray-800">
      <p className="text-center text-gray-400 font-bold text-xl uppercase tracking-widest mb-10">
        Trusted Partners
      </p>

      <div className="relative  bg-[#152343] overflow-hidden group">
        <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">

          {[...partners, ...partners].map((Icon, index) => (
            <Icon
              key={index}
              className="text-4xl mx-14 text-gray-400 hover:text-teal-400 transition"
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default PartnerLogoSlider;
