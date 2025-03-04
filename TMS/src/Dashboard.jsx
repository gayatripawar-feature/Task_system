import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/employees/tasks"); // Redirect to Task List if login successful
      } else {
        setError("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <Link to="/employees/register">Register Here</Link> |  
        <Link to="/employees/forgot-password" className="ms-2">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Dashboard;
