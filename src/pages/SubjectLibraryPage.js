import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const SubjectLibraryPage = () => {
  const { classId, subjectId } = useParams();
  // const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    file: null
  });

  const classNum = parseInt(classId.split('-')[1]);
  const subjectName = decodeURIComponent(subjectId.split('-')[1]).toUpperCase();
  
  // Sample PDF data - in a real app, this would come from an API
  const [pdfs, setPdfs] = useState([
    { id: 1, title: `${subjectName} Textbook Chapter 1`, uploadDate: "2023-05-15", views: 142, downloads: 86 },
    { id: 2, title: `${subjectName} Practice Worksheets`, uploadDate: "2023-05-10", views: 98, downloads: 64 },
    { id: 3, title: `${subjectName} Exam Preparation Guide`, uploadDate: "2023-05-05", views: 203, downloads: 152 }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.file) {
      alert("Please fill all fields and select a file");
      return;
    }

    // Create a new PDF object
    const newPdf = {
      id: pdfs.length + 1,
      title: formData.title,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      downloads: 0
    };

    // Update the state with the new PDF
    setPdfs([...pdfs, newPdf]);

    // Reset form and close it
    setFormData({
      title: "",
      file: null
    });
    setShowUploadForm(false);
    
    alert(`PDF "${formData.title}" uploaded successfully!`);
  };

  const handleViewPdf = (pdf) => {
    alert(`Viewing PDF: ${pdf.title}`);
    // In a real application, this would open the PDF in a viewer
  };

  const handleDownloadPdf = (pdf) => {
    alert(`Downloading PDF: ${pdf.title}`);
    // In a real application, this would trigger a download
  };

  return (
    <div style={{
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/library">All Classes</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/library/class-${classNum}`}>Class {classNum}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {subjectName}
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">{subjectName} Resources</h2>
          <p className="text-muted mb-0">Class {classNum} - {pdfs.length} resources available</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          {showUploadForm ? "Cancel Upload" : "+ Upload New PDF"}
        </button>
      </div>

      {showUploadForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Upload New PDF</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">PDF Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter PDF title"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="file" className="form-label">PDF File</label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  required
                />
                <div className="form-text">Only PDF files are accepted</div>
              </div>
              
              <button type="submit" className="btn btn-success">
                Upload PDF
              </button>
            </form>
          </div>
        </div>
      )}

      {pdfs.length > 0 ? (
        <div className="row">
          {pdfs.map(pdf => (
            <div key={pdf.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{pdf.title}</h5>
                  <p className="card-text">
                    <small className="text-muted">Uploaded: {pdf.uploadDate}</small>
                  </p>
                  <div className="mt-3">
                    <span className="badge bg-light text-dark me-2">
                      <i className="bi bi-eye me-1"></i> {pdf.views} views
                    </span>
                    <span className="badge bg-light text-dark">
                      <i className="bi bi-download me-1"></i> {pdf.downloads} downloads
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <button 
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleViewPdf(pdf)}
                  >
                    <i className="bi bi-eye me-1"></i> View
                  </button>
                  <button 
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleDownloadPdf(pdf)}
                  >
                    <i className="bi bi-download me-1"></i> Download
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-folder-x display-4 text-muted mb-3"></i>
            <h5 className="card-title">No resources available</h5>
            <p className="card-text">There are no PDFs uploaded for {subjectName} yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowUploadForm(true)}
            >
              Upload the First PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectLibraryPage;
