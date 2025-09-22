import React, { useState, useRef } from 'react';

const SchoolStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    grade: '',
    parentInfo: '',
    emergencyContact: '',
    medicalHistory: '',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const photoInputRef = useRef(null); // Ref to reset file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        photo: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration form submitted successfully!');

    // Reset form state
    setFormData({
      name: '',
      studentId: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      grade: '',
      parentInfo: '',
      emergencyContact: '',
      medicalHistory: '',
      photo: null
    });

    setPhotoPreview('');

    // Reset file input
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.background}></div>

        <div style={styles.content}>
          <h1 style={styles.header}>SCHOOL STUDENT REGISTRATION</h1>
          <form id="school-form" onSubmit={handleSubmit} style={styles.form}>
            
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}><b>Full Name:</b></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name with initial"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="studentId" style={styles.label}><b>Student ID:</b></label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}><b>Email:</b></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}><b>Phone Number:</b></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+00 00000 00000"
                value={formData.phone}
                maxLength={13}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="dateOfBirth" style={styles.label}><b>Date of Birth:</b></label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}><b>Address:</b></label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                style={{...styles.input, height: '100px'}}
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="grade" style={styles.label}><b>Grade/Class:</b></label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                style={styles.input}
                required
              >
                <option value="">Select Grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1}>Grade {i+1}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="parentInfo" style={styles.label}><b>Parent/Guardian Information:</b></label>
              <textarea
                id="parentInfo"
                name="parentInfo"
                placeholder="Enter parent/guardian details"
                value={formData.parentInfo}
                onChange={handleInputChange}
                style={{...styles.input, height: '100px'}}
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="emergencyContact" style={styles.label}><b>Emergency Contact Information:</b></label>
              <textarea
                id="emergencyContact"
                name="emergencyContact"
                placeholder="Enter emergency contact details"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                style={{...styles.input, height: '100px'}}
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="medicalHistory" style={styles.label}><b>Medical History:</b></label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Enter any medical conditions or allergies"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                style={{...styles.input, height: '100px'}}
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="photo" style={styles.label}><b>Photo:</b></label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={styles.input}
                ref={photoInputRef} // attach ref
              />
            </div>

            {/* Photo preview with delete button */}
            {photoPreview && (
              <div style={{ ...styles.formGroup, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={photoPreview}
                  alt="Student preview"
                  style={styles.photoPreview}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview('');
                    setFormData({ ...formData, photo: null });
                    if (photoInputRef.current) photoInputRef.current.value = '';
                  }}
                  style={styles.deleteButton}
                >
                  ✕
                </button>
              </div>
            )}

            <button type="submit" style={styles.submitButton}><b>Submit Registration</b></button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #a8c0ff, #3f2b96)',
    margin: 0,
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    width: '80%',
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    border: '2px solid #4CAF50',
    borderRadius: '20px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.95)',
    overflow: 'hidden',
    minHeight: '600px'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
    zIndex: 0
  },
  content: {
    position: 'relative',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    color: '#3f2b96',
    marginBottom: '20px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginTop: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  photoPreview: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '2px solid #4CAF50',
    objectFit: 'cover',
    backgroundColor: '#f0f0f0'
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s'
  }
};

export default SchoolStudentForm;
