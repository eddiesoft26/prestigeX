// src/components/Chatbot.jsx
import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Prevent multiple injections
    if (window.Tawk_API) return;

    // Setup Tawk_API globals
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6988e26776ad761c40db62e4/1jgvb8q5c";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    // Expose global function with safety check
    window.ChatbotAPI = {
      openChat: () => {
        const tryMaximize = () => {
          if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
            window.Tawk_API.maximize();
          } else {
            // Retry after 200ms if Tawk not ready
            setTimeout(tryMaximize, 200);
          }
        };
        tryMaximize();
      },
    };

    return () => {
      // Optional cleanup
      // document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;
