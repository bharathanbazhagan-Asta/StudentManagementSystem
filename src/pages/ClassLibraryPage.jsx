import React from "react";
import { useParams, Link } from "react-router-dom";

const ClassLibraryPage = () => {
  const { classId } = useParams();

  // Sample data for subjects per class - Tamil and English added to all classes
  const classSubjects = {
    1: ["Tamil", "English", "Mathematics", "Science"],
    2: ["Tamil", "English", "Mathematics", "Science"],
    3: ["Tamil", "English", "Mathematics", "Science"],
    4: ["Tamil", "English", "Mathematics", "Science"],
    5: ["Tamil", "English", "Mathematics", "Science"],
    6: ["Tamil", "English", "Mathematics", "Science"],
    7: ["Tamil", "English", "Mathematics", "Physics"],
    8: ["Tamil", "English", "Mathematics", "Physics"],
    9: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology"],
    10: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology"],
    11: ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology"],
    12: ["Tamil", "English", "Physics", "Chemistry", "Biology", "Mathematics"],
  };

  // Safely parse class number from route (like /class-1)
  const classNum = Number(classId?.split("-")[1]) || 0;

  // Get subjects for the class
  const subjects = classSubjects[classNum] || [];

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Link to="/library" className="btn btn-secondary me-3">
          &larr; Back to Dashboard
        </Link>
        <h2 className="mb-0">Class {classNum} Library Resources</h2>
      </div>

      <p className="mb-4">Available subjects for Class {classNum}:</p>

      {/* Subject Cards */}
      <div className="row">
        {subjects.length > 0 ? (
          subjects.map((subject, index) => {
            const imageUrl = `https://picsum.photos/250/150?random=${classNum}${index}`;
            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={subject}
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={subject}
                    style={{ height: "120px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{subject}</h5>
                    <p className="card-text text-center text-muted small">
                      Class {classNum} - {subject}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm w-100">
                      View Resources
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted text-center">
            No subjects available for this class.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassLibraryPage;
