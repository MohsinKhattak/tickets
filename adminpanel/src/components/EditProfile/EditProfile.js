import React, { useState, useEffect } from "react";
import "./EditProfile.css";

import axios from "axios";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const [admin, setAdmin] = useState({});
  const [formData, setFormData] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // State to track success message
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdmin(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = { ...formData, oldPassword, newPassword };

    axios
      .put("http://localhost:3000/api/admin/profile", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsSuccess(true); // Set success message to true
        setTimeout(() => setIsSuccess(false), 3000); // Clear success message after 3 seconds
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=" w-75  flex-column d-flex align-items-center justify-content-center">
      <h1 className="my-3">Profile</h1>
      <form className="w-75" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Old Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <button type="submit" className="btn w-50 rounded-3  btn-success">
          Save
        </button>
        {isSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Profile updated successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
