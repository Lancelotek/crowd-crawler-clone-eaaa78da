import { Link } from "react-router-dom";
import logo from "@/assets/jay23-logo.webp";

export default function PlaybookHeader() {
  return <header className="playbook-header"><div className="playbook-container"><Link to="/en" aria-label="JAY-23 — Home"><img src={logo} width="800" height="265" alt="JAY-23" className="playbook-logo" /></Link></div></header>;
}