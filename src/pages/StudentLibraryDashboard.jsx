import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import ClassLibraryPage from '../pages/ClassLibraryPage';

const StudentLibraryDashboard = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState({});
  
  // Sample data for subjects per class
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
    12: ["Tamil", "English", "Physics", "Chemistry", "Biology", "Mathematics"]
  };

  const handleCardClick = (cls) => {
    navigate(`/library/class-${cls}`);
  };

  const uploadPDF = (cls, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    alert(`Simulated: Upload PDF for Class ${cls}`);
    setUploadStatus(prev => ({...prev, [cls]: "Uploaded"}));
  };

  return (
    <div
      className="py-4"
      style={{
        backgroundColor: "#f8f9fa",
        width: "84.2%",
        minHeight: "100%", 
        position: "absolute",
        right: "0",
        top: "3.5pc"
      }}
    >
      <h2 className="mb-4 text-center" style={{ fontSize: "1.8rem" }}>
        Student Library Dashboard
      </h2>
      
      <div className="container-fluid">
        <div className="row g-3">
          {Array.from({ length: 12 }, (_, i) => {
            const cls = i + 1;
            const imageUrl = `https://picsum.photos/250/150?random=${cls}`;
            const status = uploadStatus[cls] || "No PDF uploaded";

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={cls}>
                <div 
                  className="card shadow-sm" 
                  style={{ fontSize: "0.9rem", cursor: "pointer" }}
                  onClick={() => handleCardClick(cls)}
                >
                  <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={`Class ${cls}`}
                    style={{ height: "120px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1">Class {cls}</h6>
                    <p className="card-text mb-1 text-muted" style={{ fontSize: "0.8rem" }}>
                      Subjects: {classSubjects[cls].slice(0, 3).join(", ")}
                      {classSubjects[cls].length > 3 && "..."}
                    </p>
                    <div
                      className="upload-area mt-2"
                      onClick={(e) => uploadPDF(cls, e)}
                      style={{
                        padding: "6px",
                        textAlign: "center",
                        border: "2px dashed #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      {status === "Uploaded" ? (
                        <span className="text-success">PDF Uploaded ✓</span>
                      ) : (
                        "Click to upload PDF"
                      )}
                    </div>
                  </div>
                  <div
                    className="card-footer d-flex justify-content-between align-items-center p-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <span>{status}</span>
                    <div className="dropup">
                      <button
                        className="btn btn-light btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ padding: "0.25rem 0.5rem" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        &#x22EE;
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(cls);
                            }}
                          >
                            View Class Content
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={(e) => e.stopPropagation()}>
                            Download Sample
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentLibraryDashboard;