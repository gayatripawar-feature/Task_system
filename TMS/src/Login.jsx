


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents form from reloading

    if (!username || !password) {
      alert("Please enter username and password!");
      return;
    }



//   try {
//     const response = await fetch("http://localhost:5000/api/employees/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json(); // ✅ Read response once

//     if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//     }

//     console.log("Login Success:", data);
//     alert("Login Successful!");

//     // ✅ Store token in localStorage
//     if (data.token) {
//         localStorage.setItem("token", data.token);
//         console.log("Token saved:", data.token);
//     } else {
//         console.error("No token received from API");
//     }

//     // ✅ Store user info
//     localStorage.setItem("user", JSON.stringify(data.user));

//     // ✅ Redirect to Task List page
//     navigate("/taskslist");

// } catch (error) {
//     console.error("Error:", error.message);
//     setError(error.message);
//     alert("Login failed: " + error.message);
// }
//   };



try {
  const response = await fetch("http://localhost:5000/api/employees/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  console.log("Full API Response:", data); // ✅ Log full API response

  if (!response.ok) {
      throw new Error(data.message || "Login failed");
  }

  console.log("Login Success:", data);

  if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("Token saved to localStorage:", data.token);
  } else {
      console.error("No token received from API");
  }

  localStorage.setItem("user", JSON.stringify(data.user));

  navigate("/taskslist");

} catch (error) {
  console.error("Error:", error.message);
  setError(error.message);
  alert("Login failed: " + error.message);
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

export default Login;
