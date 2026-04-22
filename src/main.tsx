import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initScrollDepthTracking } from "./lib/tracking";
import { initEngagementTracking } from "./lib/gadsConversions";

// Enforce canonical host: redirect www.jay23.com -> jay23.com (preserve path, query, hash)
if (typeof window !== "undefined" && window.location.hostname === "www.jay23.com") {
  const { pathname, search, hash } = window.location;
  window.location.replace(`https://jay23.com${pathname}${search}${hash}`);
}

createRoot(document.getElementById("root")!).render(<App />);

initScrollDepthTracking();
initEngagementTracking();
