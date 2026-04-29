
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Disable browser's automatic scroll restoration so we can re-anchor to the
  // saved Y after layout settles (images + motion animations) and avoid the
  // "shake" on reload mid-page.
  if (typeof history !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  createRoot(document.getElementById("root")!).render(<App />);
  