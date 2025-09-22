import React, { useState } from "react";

const ExamSchedule = () => {
  const [schedule, setSchedule] = useState([
    { date: "10 Oct 2025", subject: "Mathematics", className: "10th", time: "10:00 AM - 1:00 PM" },
    { date: "12 Oct 2025", subject: "Science", className: "10th", time: "10:00 AM - 1:00 PM" }
  ]);

  const [examDate, setExamDate] = useState("");
  const [examSubject, setExamSubject] = useState("");
  const [examClass, setExamClass] = useState("");
  const [examTime, setExamTime] = useState("");

  const [rollNo, setRollNo] = useState("");
  const [result, setResult] = useState(null);

  // Sample Results
  const results = {
    "101": { name: "Rahul Sharma", marks: 350 },
    "102": { name: "Priya Singh", marks: 280 },
    "103": { name: "Amit Kumar", marks: 300 },
    "104": { name: "Sneha Patel", marks: 390 }
  };

  const addExam = () => {
    if (examDate && examSubject && examClass && examTime) {
      setSchedule([
        ...schedule,
        { date: examDate, subject: examSubject, className: examClass, time: examTime }
      ]);

      setExamDate("");
      setExamSubject("");
      setExamClass("");
      setExamTime("");
    } else {
      alert("⚠ Please fill all fields before adding an exam!");
    }
  };

  const deleteExam = (index) => {
    const updated = [...schedule];
    updated.splice(index, 1);
    setSchedule(updated);
  };

  const checkResult = () => {
    if (results[rollNo]) {
      let student = results[rollNo];
      let grade = "F";
      if (student.marks >= 360) grade = "A+";
      else if (student.marks >= 300) grade = "A";
      else if (student.marks >= 250) grade = "B";
      else if (student.marks >= 200) grade = "C";
      else grade = "D";
      setResult({ ...student, roll: rollNo, grade });
    } else {
      alert(`❌ Result not found for Roll No: ${rollNo}`);
      setResult(null);
    }
  };

  return (
    <div>
      <header style={styles.header}>
        <h1>ABC School - Exam Schedule & Results</h1>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>📅 Exam Schedule</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Subject</th>
              <th style={styles.th}>Class</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((exam, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{exam.date}</td>
                <td style={styles.td}>{exam.subject}</td>
                <td style={styles.td}>{exam.className}</td>
                <td style={styles.td}>{exam.time}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => deleteExam(idx)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Add New Exam</h3>
        <div style={styles.formRow}>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Subject"
            value={examSubject}
            onChange={(e) => setExamSubject(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Class"
            value={examClass}
            onChange={(e) => setExamClass(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Time (e.g. 10:00 AM - 1:00 PM)"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={addExam}>
            Add Exam
          </button>
        </div>

        <hr />

        <h2 style={styles.heading}>📊 Check Result</h2>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={checkResult}>
          Get Result
        </button>

        {result && (
          <div style={styles.resultCard}>
            <h3>Result</h3>
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Roll No:</strong> {result.roll}
            </p>
            <p>
              <strong>Total Marks:</strong> {result.marks} / 400
            </p>
            <p>
              <strong>Grade:</strong>{" "}
              <span style={{ fontWeight: "bold", color: "#d9534f" }}>
                {result.grade}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSchedule;

// Inline styles (for quick JSX conversion)
const styles = {
  header: {
    background: "#003366",
    color: "white",
    padding: "20px",
    textAlign: "center"
  },
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    color: "#003366",
    marginTop: 0
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    background: "#003366",
    color: "white"
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center"
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    margin: "5px 0"
  },
  button: {
    background: "#003366",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "5px"
  },
  formRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  resultCard: {
    padding: "15px",
    background: "#eaf4ff",
    borderLeft: "5px solid #003366",
    borderRadius: "6px",
    marginTop: "15px"
  }
};
