

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  
    userRole: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/employees/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Employee</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="phoneNumber" onChange={handleChange} required />
          </div>
          {/* <div className="col-md-6 mb-3">
            <label className="form-label">Assigned By</label>
            <input type="text" className="form-control" name="assignedBy" onChange={handleChange} required />
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">User Role</label>
            <select className="form-control" name="userRole" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Admin">Director</option>
              <option value="Manager">EA</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>

      <div className="mt-3">
        Already have an account? <Link to="/login">Login</Link> |  
        <Link to="/employees/forgot-password" className="ms-2">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default EmployeeRegister;
