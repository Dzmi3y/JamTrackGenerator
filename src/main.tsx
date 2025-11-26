import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

const preloader = document.getElementById("preloader");
if (preloader) {
  preloader.classList.add("fade-out");
  setTimeout(() => preloader.remove(), 500);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered:", reg))
      .catch((err) =>
        console.error("Service Worker registration failed:", err)
      );
  });
}
