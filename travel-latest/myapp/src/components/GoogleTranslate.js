import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Prevent loading script multiple times
    if (!window.googleTranslateScriptAdded) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,te,ta,ml,kn,gu,mr,pa,bn",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateScriptAdded = true; // ✅ Only load once
    }
  }, []);

  return (
    <>
      {/* 🌐 Translate Icon Button */}
      <button
        onClick={() => setShowWidget(!showWidget)}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          zIndex: "5000",
          background: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 5px 10px rgba(0,0,0,.2)"
        }}
        title="Translate Website"
      >
        🌐
      </button>

      {/* ✅ Widget container only when clicked */}
      {showWidget && (
        <div
          id="google_translate_element"
          style={{
            position: "fixed",
            top: "70px",
            right: "10px",
            zIndex: "5000",
            background: "white",
            padding: "8px",
            borderRadius: "8px",
            boxShadow: "0px 5px 12px rgba(0,0,0,0.2)"
          }}
        ></div>
      )}
    </>
  );
}