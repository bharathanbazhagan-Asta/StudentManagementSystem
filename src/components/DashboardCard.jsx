import React from "react";

function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        margin: "0.5rem",
        textAlign: "center",
        width: "150px"
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default DashboardCard;