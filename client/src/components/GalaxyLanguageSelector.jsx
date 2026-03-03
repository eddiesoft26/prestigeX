import React, { useEffect } from "react";

const FixedLanguageSelector = () => {
  useEffect(() => {
    // 1. Initialize Google Translate API
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          // Removing InlineLayout.SIMPLE to allow the standard dropdown to function better
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[9999] group">
        {/* Container with your requested colors */}
        <div 
          id="google_translate_element" 
          className="bg-white border-2 border-[#020617] rounded-xl shadow-2xl overflow-hidden"
        ></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. Hide Google Branding & Banner */
        .goog-te-banner-frame.skiptranslate, .goog-logo-link, .goog-te-gadget span {
          display: none !important;
        }
        body { top: 0px !important; }

        /* 2. Style the Container to be White */
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }

        /* 3. Style the actual Select/Dropdown Box */
        .goog-te-combo {
          background-color: #ffffff !important;
          color: #020617 !important; /* Dark Blue Text */
          border: none !important;
          padding: 10px 14px !important;
          border-radius: 8px !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          outline: none !important;
          cursor: pointer !important;
          appearance: none !important; /* Removes default browser styling */
          -webkit-appearance: none !important;
        }

        /* 4. Add a custom arrow to replace the hidden one */
        #google_translate_element {
          position: relative;
        }
        #google_translate_element::after {
          content: '▼';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #020617;
          font-size: 10px;
          pointer-events: none;
        }

        /* 5. Mobile Optimization */
        @media (max-width: 768px) {
          .goog-te-combo {
            font-size: 12px !important;
            padding: 8px 10px !important;
          }
        }
      `}} />
    </>
  );
};

export default FixedLanguageSelector;