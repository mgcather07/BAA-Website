/* =============================================================================
   Firebase initialization (Analytics) for the BAA website.
   Loaded site-wide by main.js. Uses the Firebase modular CDN SDK.
   The config below is the public web app config for project baa-website-908e4
   — these values are safe to expose in client code (they are not secrets).
   ============================================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyQz2Ue-h2vpNEE2CTLM-TPsm6W5pwPQs",
  authDomain: "baa-website-908e4.firebaseapp.com",
  projectId: "baa-website-908e4",
  storageBucket: "baa-website-908e4.firebasestorage.app",
  messagingSenderId: "25601345641",
  appId: "1:25601345641:web:df3cda67aa02d1bec13af8",
  measurementId: "G-WMWYGQ1TWR"
};

try {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
} catch (e) {
  // Analytics is non-critical — never let it break the page.
  console.warn("Firebase Analytics init skipped:", e && e.message);
}
