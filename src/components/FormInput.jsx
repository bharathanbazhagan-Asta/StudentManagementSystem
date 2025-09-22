import React from "react";

function FormInput({ label, type = "text", name, value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.3rem" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          padding: "0.5rem",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />
    </div>
  );
}

export default FormInput;