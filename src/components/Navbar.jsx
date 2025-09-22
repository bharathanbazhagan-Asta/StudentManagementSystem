import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <h2>ERP System</h2>
      <div>
        <Link to="/dashboard" style={{ color: "#fff", marginRight: "1rem" }}>Dashboard</Link>
        <Link to="/profile" style={{ color: "#fff" }}>Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;