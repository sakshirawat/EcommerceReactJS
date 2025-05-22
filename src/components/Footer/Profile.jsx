// components/Profile/Profile.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.css";
import { userActions } from "../../store/userSlice"; // Corrected the import path

const Profile = () => {
  // Get the current user from Redux store
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // Local state to toggle edit mode
  const [editMode, setEditMode] = useState(false);

  // Local state to hold form input values
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
  });

  // Handle form input changes and update state
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Dispatch updated user data to Redux store
  const handleSave = () => {
    dispatch(userActions.updateUser(formData));
    setEditMode(false); // Exit edit mode
  };

  // If user is not logged in, show a message
  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>My Profile</h1>
        <p className={styles.message}>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Profile</h1>

      {editMode ? (
        // Form view in edit mode
        <div className={styles.form}>
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              disabled // Email is not editable
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.input}
              rows={3}
            />
          </label>

          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={() => setEditMode(false)} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      ) : (
        // View-only mode showing user details
        <div>
          <p className={styles.detail}>
            <strong>Name:</strong> {user.name}
          </p>
          <p className={styles.detail}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles.detail}>
            <strong>Gender:</strong> {user.gender || "Not specified"}
          </p>
          <p className={styles.detail}>
            <strong>Date of Birth:</strong> {user.dob || "Not specified"}
          </p>
          <p className={styles.detail}>
            <strong>Address:</strong> {user.address || "Not specified"}
          </p>

          <button onClick={() => setEditMode(true)} className={styles.editButton}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
