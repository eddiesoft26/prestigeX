import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";

const recentUsers = [
  { name: "Lukas Schmidt", countryCode: "DE", action: "invested", amount: 1200 },
  { name: "Sofia Rossi", countryCode: "IT", action: "withdrawn", amount: 500 },
  { name: "Oliver Jensen", countryCode: "DK", action: "invested", amount: 900 },
  { name: "Emma Novak", countryCode: "PL", action: "invested", amount: 1500 },
  { name: "Lucas Dubois", countryCode: "FR", action: "withdrawn", amount: 300 },
  { name: "Ana Silva", countryCode: "PT", action: "invested", amount: 2200 },
  { name: "Marta Kovac", countryCode: "HR", action: "invested", amount: 800 },
  { name: "Erik Johansson", countryCode: "SE", action: "withdrawn", amount: 400 },
  { name: "Lena Müller", countryCode: "DE", action: "invested", amount: 1300 },
  { name: "Marco Bianchi", countryCode: "IT", action: "invested", amount: 1750 },
  { name: "Katarina Horvat", countryCode: "HR", action: "withdrawn", amount: 600 },
  { name: "Nina Petrova", countryCode: "BG", action: "invested", amount: 950 },
  { name: "Sven Larsen", countryCode: "NO", action: "invested", amount: 1100 },
  { name: "Julia Wagner", countryCode: "AT", action: "withdrawn", amount: 450 },
  { name: "Peter Novak", countryCode: "CZ", action: "invested", amount: 1700 },
  { name: "Isabel Ferreira", countryCode: "PT", action: "withdrawn", amount: 300 },
  { name: "Frederik Hansen", countryCode: "DK", action: "invested", amount: 2000 },
  { name: "Clara Dubois", countryCode: "FR", action: "invested", amount: 1250 },
  { name: "Mikkel Sørensen", countryCode: "DK", action: "withdrawn", amount: 700 },
  { name: "Sofia Rossi", countryCode: "IT", action: "invested", amount: 900 },
];

const RecentActivityToast = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeoutId;

    const showNextToast = () => {
      setShow(true); // show current toast
      timeoutId = setTimeout(() => {
        setShow(false); // hide current toast
        timeoutId = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % recentUsers.length); // move to next
          showNextToast(); // recursive call ensures no overlap
        }, 9000); // wait for exit animation
      }, 3000); // visible for 3s
    };

    showNextToast(); // start the loop

    return () => clearTimeout(timeoutId);
  }, []);

  const user = recentUsers[currentIndex];
  const isInvest = user.action === "invested";

  return (
    <div className="absolute top-24 right-4 z-50 w-52 sm:w-64 md:w-72">
      <AnimatePresence>
        {show && (
          <motion.div
            key={currentIndex + "-" + Date.now()} // unique key
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg shadow-lg border-l-4 ${
              isInvest ? "border-green-500 bg-white/80" : "border-red-500 bg-white/80"
            } text-gray-900 text-xs sm:text-sm md:text-base`}
          >
            {/* Flag */}
            <ReactCountryFlag
              countryCode={user.countryCode}
              svg
              style={{ width: "16px", height: "16px" }}
              title={user.countryCode}
            />

            {/* Text */}
            <div className="flex flex-col text-left">
              <span className="font-semibold truncate">
                {user.name} {isInvest ? "just invested" : "just withdrew"}
              </span>
              <span className={`${isInvest ? "text-green-500" : "text-red-500"} font-bold`}>
                ${user.amount.toLocaleString()}
              </span>
            </div>

           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentActivityToast;
