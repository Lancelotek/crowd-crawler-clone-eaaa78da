import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initScrollDepthTracking } from "./lib/tracking";
import { initEngagementTracking } from "./lib/gadsConversions";

createRoot(document.getElementById("root")!).render(<App />);

initScrollDepthTracking();
initEngagementTracking();
