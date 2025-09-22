import React, { useState } from "react";
import "./StudentAdmissionForm.css";

// StudentAdmissionForm.jsx
import { db, storage } from "./firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // 👈 here
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const StudentAdmissionForm = () => {
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [classValue, setClassValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview("");
      setPhotoFile(null);
    }
  };

  const handleClassChange = (e) => {
    setClassValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      // Upload photo to storage
      let photoURL = "";
      if (photoFile) {
        const storageRef = ref(
          storage,
          `student_photos/${photoFile.name}_${Date.now()}`
        );
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // Prepare Firestore data
      const studentData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        dob: data.get("dob"),
        gender: data.get("gender"),
        bloodGroup: data.get("bloodGroup"),
        health: data.get("health"),
        class: data.get("class"),
        group: data.get("group") || "",
        previousSchool: data.get("previousSchool"),
        parentName: data.get("parentName"),
        parentOccupation: data.get("parentOccupation"),
        phone: data.get("phone"),
        email: data.get("email"),
        address: data.get("address"),
        photoURL: photoURL,
        createdAt: serverTimestamp(), // Firestore Timestamp
      };

      // Add to Firestore collection
      await addDoc(collection(db, "admissions"), studentData);

      // Reset form after success
      form.reset();
      setPhotoPreview("");
      setClassValue("");
      setPhotoFile(null);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error saving admission:", err);
      alert("❌ Error submitting form. Try again.");
    }
  };

  return (
    <div className="form-box">
      <h2>Student Admission Form</h2>

      {!formSubmitted ? (
        <form id="admissionForm" onSubmit={handleSubmit}>
          <label>First Name *</label>
          <input type="text" name="firstName" required />

          <label>Last Name *</label>
          <input type="text" name="lastName" required />

          <label>Date of Birth *</label>
          <input type="date" name="dob" required />

          <label>Gender *</label>
          <select name="gender" required>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Blood Group</label>
          <select name="bloodGroup">
            <option value="">Select</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <label>Health Information</label>
          <textarea name="health" placeholder="e.g., Allergies"></textarea>

          <label>Class Applying For *</label>
          <select
            name="class"
            required
            value={classValue}
            onChange={handleClassChange}
          >
            <option value="">Select class</option>
            <option>Pre-KG</option>
            <option>LKG</option>
            <option>UKG</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option value="11">11</option>
          </select>

          {classValue === "11" && (
            <>
              <label>Group *</label>
              <select name="group" required>
                <option value="">Select group</option>
                <option>Science - Biology</option>
                <option>Science - Computer Science</option>
                <option>Commerce - Business & Accountancy</option>
                <option>Commerce - Computer Application</option>
                <option>Arts - History & Economics</option>
              </select>
            </>
          )}

          <label>Previous School</label>
          <input type="text" name="previousSchool" />

          <label>Parent / Guardian Name *</label>
          <input type="text" name="parentName" required />

          <label>Parent Occupation</label>
          <input type="text" name="parentOccupation" />

          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="10-digit number"
            required
          />

          <label>Parent Email *</label>
          <input type="email" name="email" required />

          <label>Address *</label>
          <textarea name="address" required></textarea>

          <label>Upload Student Photo *</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            onChange={handlePhotoChange}
          />
          {photoPreview && (
            <img
              alt="Preview"
              src={photoPreview}
              style={{ display: "block", maxWidth: "120px", marginTop: "10px" }}
            />
          )}

          <div className="consent-box">
            <h4>Parent Consent</h4>
            <label>
              <input type="checkbox" required /> I consent to my child
              participating in school activities.
            </label>
            <label>
              <input type="checkbox" required /> I consent to emergency medical
              treatment if necessary.
            </label>
            <label>
              <input type="checkbox" required /> I agree to the school’s rules
              and policies.
            </label>
          </div>

          <button type="submit">Submit Application</button>
        </form>
      ) : (
        <div className="success">
          ✅ Our school will contact you soon. Thank you for registering!
        </div>
      )}
    </div>
  );
};

export default StudentAdmissionForm;
