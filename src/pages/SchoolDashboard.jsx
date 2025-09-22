import React, { useState, useEffect } from "react";
import './SchoolDashboard.css'

export default function SchoolDashboard() {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students") || "{}");
  });
  const [studentCounter, setStudentCounter] = useState(() => {
    return parseInt(localStorage.getItem("studentCounter") || "0");
  });
  const [currentStudent, setCurrentStudent] = useState(null);
  const [tab, setTab] = useState("home");

  // Form states for faculty panel
  const [facultyForm, setFacultyForm] = useState({
    fname: "",
    femail: "",
    fclass: "",
    fattendance: "",
    fclasses: "",
    fgrades: ""
  });
  const [loginInput, setLoginInput] = useState("");

  // Save to localStorage whenever students or counter changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("studentCounter", studentCounter);
  }, [students, studentCounter]);

  // Generate student ID
  const generateStudentId = () => {
    const next = studentCounter + 1;
    setStudentCounter(next);
    return "S" + next.toString().padStart(3, "0");
  };

  const loginStudent = () => {
    const id = loginInput.trim();
    if (!students[id]) {
      alert("Invalid Student ID. Please check with Faculty.");
      return;
    }
    setCurrentStudent(id);
    alert(`Login successful! Welcome ${students[id].name}`);
    setTab("home");
  };

  const changeTab = (tabName) => {
    const protectedTabs = ["profile", "classes", "attendance", "grades", "settings"];
    if (!currentStudent && protectedTabs.includes(tabName)) {
      alert("Please login first with your Student ID.");
      return;
    }
    setTab(tabName);
  };

  const handleFacultyInput = (e) => {
    const { name, value } = e.target;
    setFacultyForm({ ...facultyForm, [name]: value });
  };

  const addStudent = () => {
    const id = generateStudentId();
    const gradesArray = facultyForm.fgrades
      .split(",")
      .map((g) => {
        const [subject, grade] = g.split(":").map((x) => x.trim());
        return subject && grade ? { subject, grade } : null;
      })
      .filter(Boolean);

    setStudents({
      ...students,
      [id]: {
        name: facultyForm.fname,
        email: facultyForm.femail,
        className: facultyForm.fclass,
        attendance: facultyForm.fattendance,
        classes: facultyForm.fclasses
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        grades: gradesArray
      }
    });

    setFacultyForm({
      fname: "",
      femail: "",
      fclass: "",
      fattendance: "",
      fclasses: "",
      fgrades: ""
    });
    alert("Student added with ID: " + id);
  };

  const renderContent = () => {
    if (tab === "home") {
      if (!currentStudent) {
        return (
          <>
            <div className="card">
              <h3>Welcome to the School Dashboard</h3>
              <p>Please login with your Student ID to view your details.</p>
            </div>
            <div className="card">
              <h3>Student Login</h3>
              <input
                type="text"
                value={loginInput}
                placeholder="Enter Student ID"
                onChange={(e) => setLoginInput(e.target.value)}
              />
              <button onClick={loginStudent}>Login</button>
            </div>
          </>
        );
      }

      const s = students[currentStudent];
      return (
        <>
          <div className="card">
            <h3>Welcome, {s.name}!</h3>
            <p>This is your school dashboard.</p>
          </div>
          <div className="stats">
            <div className="stat">
              <h4>Class</h4>
              <p>{s.className || "-"}</p>
            </div>
            <div className="stat">
              <h4>Attendance %</h4>
              <p>{s.attendance || "0"}%</p>
            </div>
            <div className="stat">
              <h4>Grades</h4>
              <p>{s.grades?.length || 0} Subjects</p>
            </div>
          </div>
        </>
      );
    }

    if (!currentStudent && ["profile", "classes", "attendance", "grades", "settings"].includes(tab)) {
      return null;
    }

    const s = students[currentStudent];

    switch (tab) {
      case "profile":
        return (
          <div className="card">
            <h3>Student Profile</h3>
            <p><strong>ID:</strong> {currentStudent}</p>
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Class:</strong> {s.className}</p>
          </div>
        );

      case "classes":
        return (
          <div className="card">
            <h3>Your Classes</h3>
            <ul>{(s.classes || []).map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        );

      case "attendance":
        return (
          <div className="card">
            <h3>Attendance</h3>
            <p>Attendance Percentage: <strong>{s.attendance || "0"}%</strong></p>
          </div>
        );

      case "grades":
        return (
          <div className="card">
            <h3>Grades</h3>
            {(s.grades || []).map((g, i) => (
              <p key={i}><strong>{g.subject}:</strong> {g.grade}</p>
            ))}
          </div>
        );

      case "settings":
        return (
          <div className="card">
            <h3>Settings</h3>
            <p>You cannot change your profile. Contact faculty for updates.</p>
          </div>
        );

      case "faculty":
        return (
          <>
            <div className="card">
              <h3>Faculty Panel - Add Student</h3>
              <input name="fname" value={facultyForm.fname} placeholder="Name" onChange={handleFacultyInput} />
              <input name="femail" value={facultyForm.femail} placeholder="Email" onChange={handleFacultyInput} />
              <input name="fclass" value={facultyForm.fclass} placeholder="Class (e.g., 8th Grade)" onChange={handleFacultyInput} />
              <input name="fattendance" value={facultyForm.fattendance} placeholder="Attendance %" onChange={handleFacultyInput} />
              <input name="fclasses" value={facultyForm.fclasses} placeholder="Subjects (comma separated)" onChange={handleFacultyInput} />
              <input name="fgrades" value={facultyForm.fgrades} placeholder="Grades (Format: Math:A, English:B)" onChange={handleFacultyInput} />
              <button onClick={addStudent}>Add Student</button>
            </div>
            <div className="card">
              <h3>All Students</h3>
              <ul>
                {Object.keys(students).length > 0
                  ? Object.keys(students).map((id) => (
                      <li key={id}><strong>{id}</strong> - {students[id].name}</li>
                    ))
                  : <li>No students added yet</li>}
              </ul>
            </div>
          </>
        );

      default:
        return <div className="card"><p>Page not found.</p></div>;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      <aside style={{ width: 220, background: "#2c3e50", padding: 20, color: "white" }}>
        <h2>School Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["home","profile","classes","attendance","grades","settings","faculty"].map((name) => (
            <li
              key={name}
              onClick={() => changeTab(name)}
              style={{
                padding: "10px",
                marginBottom: "10px",
                background: tab === name ? "#1abc9c" : "#34495e",
                cursor: "pointer",
                borderRadius: 5
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        <header>
          <h1>{tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
        </header>
        <section>{renderContent()}</section>
      </main>
    </div>
  );
}
