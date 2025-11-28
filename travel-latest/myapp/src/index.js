import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Global error suppression (prevents "Script error." and similar console noise)
window.onerror = function () {
  // Prevent all generic script errors (like from Google Translate)
  return true;
};

window.addEventListener('error', (e) => {
  // Prevents cross-origin and other unhandled runtime script errors
  e.preventDefault();
  return true;
});

window.addEventListener('unhandledrejection', (e) => {
  // Prevents promise rejections from showing in console
  e.preventDefault();
  return true;
});

// ✅ Render the main app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Optional: measure performance
reportWebVitals();
