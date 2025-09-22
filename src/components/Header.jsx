import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/Header.css";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const navItems = [
    { to: "/academics", text: "Academics" },
    // You can add more header links here if needed
  ];

  return (
    <header className="app-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#2563eb", color: "#fff" }}>
      <div className="header-left">
        <h1 className="header-title" style={{ margin: 0 }}>ERP Student Management</h1>
      </div>
      <nav className="header-nav" style={{ display: "flex", gap: "20px" }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                textDecoration: "none",
                fontWeight: 500,
                color: isActive ? "#ffeb3b" : "#fff",
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: isActive ? "#1e40af" : "transparent",
                transition: "background 0.3s, color 0.3s"
              }}
            >
              {item.text}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
