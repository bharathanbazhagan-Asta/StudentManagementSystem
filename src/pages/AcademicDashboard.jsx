import React, { useState } from "react";
import "./AcademicsContent.css";

export default function AcademicsContent() {
  const [role, setRole] = useState("student");
  const [currentStudent, setCurrentStudent] = useState("Alice");
  const [activeSection, setActiveSection] = useState(null);

  const [studentAttendance, setStudentAttendance] = useState({
    Alice: { total: 50, attended: 45 },
    Bob: { total: 50, attended: 40 },
    Charlie: { total: 50, attended: 42 },
  });

  const [leaveApplications, setLeaveApplications] = useState([]);
  const [events, setEvents] = useState([
    "Science Fair - 25th Sept",
    "Sports Day - 1st Oct",
  ]);

  const [timetable, setTimetable] = useState([
    ["Monday", "Math", "Science", "English", "History", "Physics", "Chemistry", "Biology", "PE"],
    ["Tuesday", "English", "Math", "Chemistry", "Physics", "History", "Biology", "Science", "PE"],
    ["Wednesday", "Biology", "Chemistry", "Math", "English", "Science", "History", "Physics", "PE"],
    ["Thursday", "Math", "English", "Biology", "Science", "History", "Physics", "Chemistry", "PE"],
    ["Friday", "English", "Science", "Math", "History", "Biology", "Chemistry", "Physics", "PE"],
    ["Saturday", "Sports", "Math", "English", "Science", "Club Activity", "Biology", "Chemistry", "Physics"],
  ]);

  // Attendance Summary
  const renderAttendance = (student) => {
    const data = studentAttendance[student];
    const percent = data.total
      ? ((data.attended / data.total) * 100).toFixed(2) + "%"
      : "0%";

    return (
      <>
        <p>Student: {student}</p>
        <p>Total Classes: {data.total}</p>
        <p>Attended: {data.attended}</p>
        <p>Attendance: {percent}</p>
      </>
    );
  };

  const uploadAttendance = (student, total, attended) => {
    setStudentAttendance((prev) => ({
      ...prev,
      [student]: { total, attended },
    }));
    alert(`Attendance uploaded for ${student}`);
  };

  // Leave
  const applyLeave = (from, to, reason) => {
    setLeaveApplications((prev) => [
      ...prev,
      { student: currentStudent, from, to, reason },
    ]);
    alert("Leave applied.");
  };

  // Timetable update
  const updateTimetableCell = (dayIndex, subjectIndex, value) => {
    setTimetable((prev) => {
      const updated = [...prev];
      updated[dayIndex] = [...updated[dayIndex]];
      updated[dayIndex][subjectIndex] = value;
      return updated;
    });
  };

  return (
    <div className="academics-content">
      {/* Top Filters */}
      <div className="academics-card">
        <label>Role: </label>
        <select
          className="academics-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <label> Student: </label>
        <select
          className="academics-select"
          value={currentStudent}
          onChange={(e) => setCurrentStudent(e.target.value)}
        >
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
        </select>

        <div>
          <button className="academics-btn" onClick={() => setActiveSection("assignment")}>Upload Assignment</button>
          <button className="academics-btn" onClick={() => setActiveSection("circular")}>Circular</button>
          <button className="academics-btn" onClick={() => setActiveSection("attendance")}>Attendance Summary</button>
          <button className="academics-btn" onClick={() => setActiveSection("events")}>Events</button>
          <button className="academics-btn" onClick={() => setActiveSection("leave")}>Leave Apply</button>
          <button className="academics-btn" onClick={() => setActiveSection("timetable")}>Class Timetable</button>
        </div>
      </div>

      {/* Assignment */}
      {activeSection === "assignment" && (
        <div className="academics-card fixed-section">
          <h2>Upload Assignment</h2>
          <input type="file" className="academics-input" />
          <button
            className="academics-btn"
            onClick={() => alert("Assignment uploaded!")}
          >
            Upload
          </button>
        </div>
      )}

      {/* Circular */}
      {activeSection === "circular" && (
        <div className="academics-card fixed-section">
          <h2>Circular</h2>
          {role === "faculty" ? (
            <input type="file" className="academics-input" />
          ) : (
            <ul className="academics-list">
              <li>No circulars available.</li>
            </ul>
          )}
        </div>
      )}

      {/* Attendance */}
      {activeSection === "attendance" && (
        <div className="academics-card fixed-section">
          <h2>Attendance Summary</h2>
          {role === "faculty" ? (
            <>
              <label>
                Student:
                <select id="studentSelect" className="academics-select">
                  <option value="Alice">Alice</option>
                  <option value="Bob">Bob</option>
                  <option value="Charlie">Charlie</option>
                </select>
              </label>
              <input id="inputTotal" type="number" placeholder="Total Classes" className="academics-input" />
              <input id="inputAttended" type="number" placeholder="Attended Classes" className="academics-input" />
              <button
                className="academics-btn"
                onClick={() =>
                  uploadAttendance(
                    document.getElementById("studentSelect").value,
                    parseInt(document.getElementById("inputTotal").value),
                    parseInt(document.getElementById("inputAttended").value)
                  )
                }
              >
                Upload Attendance
              </button>
            </>
          ) : (
            renderAttendance(currentStudent)
          )}
        </div>
      )}

      {/* Events */}
      {activeSection === "events" && (
        <div className="academics-card fixed-section">
          <h2>Events</h2>
          <ul className="academics-list">
            {events.map((ev, idx) => (
              <li key={idx}>{ev}</li>
            ))}
          </ul>
          {role === "faculty" && (
            <input
              type="text"
              placeholder="Enter event detail..."
              className="academics-input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  setEvents([...events, e.target.value]);
                  e.target.value = "";
                }
              }}
            />
          )}
        </div>
      )}

      {/* Leave */}
      {activeSection === "leave" && (
        <div className="academics-card fixed-section">
          <h2>Leave Apply</h2>
          {role === "student" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const from = e.target.leaveFrom.value;
                const to = e.target.leaveTo.value;
                const reason = e.target.leaveReason.value;
                applyLeave(from, to, reason);
                e.target.reset();
              }}
            >
              <label>From: <input type="date" name="leaveFrom" required className="academics-input" /></label>
              <label>To: <input type="date" name="leaveTo" required className="academics-input" /></label>
              <label>Reason: <textarea name="leaveReason" required className="academics-textarea" /></label>
              <button type="submit" className="academics-btn">Apply</button>
            </form>
          ) : (
            <ul className="academics-list">
              {leaveApplications.length === 0 ? (
                <li>No leave applications.</li>
              ) : (
                leaveApplications.map((app, idx) => (
                  <li key={idx}>
                    {app.student}: {app.from} to {app.to} - {app.reason}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}

      {/* Timetable */}
      {activeSection === "timetable" && (
        <div className="academics-card fixed-section">
          <h2>Class Timetable</h2>
          <table className="academics-table">
            <thead>
              <tr>
                <th>Day</th>
                {["1st Hr","2nd Hr","3rd Hr","4th Hr","5th Hr","6th Hr","7th Hr","8th Hr"].map((h, idx) => (
                  <th key={idx}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((sub, colIdx) => (
                    <td key={colIdx}>
                      {role === "faculty" ? (
                        <input
                          value={sub}
                          className="academics-input"
                          onChange={(e) =>
                            updateTimetableCell(rowIdx, colIdx + 1, e.target.value)
                          }
                        />
                      ) : (
                        sub
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
