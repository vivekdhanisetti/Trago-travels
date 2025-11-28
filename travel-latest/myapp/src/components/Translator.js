import React, { useEffect, useState } from "react";

export default function Translator() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* 🌐 Floating icon button */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 10000
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: "#007bff",
            color: "white",
            border: "none",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          🌐
        </button>

        {/* Popup */}
        {open && (
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              right: "0px",
              background: "white",
              padding: "12px",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
          >
            <div id="google_translate_element"></div>
          </div>
        )}
      </div>
    </>
  );
}