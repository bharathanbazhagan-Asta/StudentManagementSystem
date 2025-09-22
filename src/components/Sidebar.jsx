import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  // All your sidebar items in one array
  const menuItems = [
    { to: "/dashboard", text: "Dashboard" },
    { to: "/admission", text: "Admission" },
    { to: "/fees", text: "Fees" },
    { to: "/hostel", text: "Hostel" },
    { to: "/exams", text: "Exams" },
    { to: "/library", text: "Library" },
    { to: "/profile", text: "Profile" },
    { to: "/academics", text: "Academics" }, // ✅ New Academics page
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        background: "#f9fafb",
        padding: "1rem 0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Make heading clickable */}
      <Link
        to="/"
        style={{
          margin: "0 1rem 1rem",
          fontSize: "22px",
          color: "#2563eb",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Portals
      </Link>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li
              key={item.to}
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <Link
                to={item.to}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: isActive ? "#1e40af" : "#374151",
                  background: isActive ? "#e0e7ff" : "transparent",
                  transition: "background 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e0e7ff";
                  e.target.style.color = "#1e40af";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isActive ? "#e0e7ff" : "transparent";
                  e.target.style.color = isActive ? "#1e40af" : "#374151";
                }}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
