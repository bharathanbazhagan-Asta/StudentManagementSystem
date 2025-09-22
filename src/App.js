import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages
import Login from "./pages/Login";
import SchoolDashboard from "./pages/SchoolDashboard";
import StudentAdmissionForm from './pages/StudentAdmissionForm';
import StudentFeesPayment from "./pages/StudentFeesPayment";
import Hostel from "./pages/SchoolStudentForm";
import Exams from "./pages/ExamSchedule";
import Library from "./pages/StudentLibraryDashboard";
import Profile from "./pages/Profile";
import ClassLibraryPage from './pages/ClassLibraryPage';
import SubjectLibraryPage from './pages/SubjectLibraryPage';
import AcademicDashboard from "./pages/AcademicDashboard";


function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Main Content */}
          {/* <div className="p-4 overflow-auto" style={{ flex: 1 }}> */}
          <div className="" style={{ flex: 1, marginLeft:"3.8%" }}>
            <Routes>
              {/* Auth */}
              <Route path="/" element={<Login />} />

              {/* Main Pages */}
              <Route path="/dashboard" element={<SchoolDashboard />} />
              <Route path="/admission" element={<StudentAdmissionForm />} />
              <Route path="/fees" element={<StudentFeesPayment />} />
              <Route path="/hostel" element={<Hostel />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/class-:classId" element={<ClassLibraryPage />} />
              <Route path="/class-:classId/:subjectName" element={<SubjectLibraryPage />} />
              <Route path="/academics" element={<AcademicDashboard />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
