import React, { useState } from "react";

const StudentLogin = () => {
  const [mobile, setMobile] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (studentId.trim() === "") {
      setError("Student ID is required.");
      return;
    }

    setError("");
    alert(`Login successful!\nMobile: ${mobile}\nStudent ID: ${studentId}`);
  };

  return (
    // <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mobile Number"
            maxLength="10"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    // </div>
  );
};

// Inline styles with animations
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundImage:
      "url('World globe on  book_ education school concept  _ Premium Photo.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(3, 23, 39, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    animation: "fadeInBody 1.2s ease-in-out",
  },
  container: {
    backgroundColor: "white",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
    width: "320px",
    animation: "fadeInSlide 1s ease-out",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginTop: "-5px",
  },
};

// Adding animations globally (React doesn't support @keyframes inline)
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(`
    @keyframes fadeInBody {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }`);
  styleSheet.insertRule(`
    @keyframes fadeInSlide {
      0% { opacity: 0; transform: translateY(-50px); }
      100% { opacity: 1; transform: translateY(0); }
    }`);
}

export default StudentLogin;
