import React from "react";
import { Link, useLocation } from "react-router-dom";
// import "../components/academic-dashboard.css";

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
        width: "240px", // little wider
        height: "100vh",
        background: "#f9fafb", // lighter background
        padding: "1rem 0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          margin: "0 1rem 1rem",
          fontSize: "22px",
          color: "#2563eb",
        }}
      >
        Portals
      </h3>

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
                borderBottom: "1px solid #e5e7eb", // subtle separator line
              }}
            >
              <Link
                to={item.to}
                style={{
                  display: "block",
                  padding: "14px 20px", // even padding
                  textDecoration: "none", // no underline
                  fontSize: "18px", // bigger text
                  fontWeight: 500,
                  color: isActive ? "#1e40af" : "#374151",
                  background: isActive ? "#e0e7ff" : "transparent",
                  transition: "background 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e0e7ff"; // hover background
                  e.target.style.color = "#1e40af"; // hover color
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
