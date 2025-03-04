import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import EmployeeRegister from "./EmployeeRegister";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import TaskList from "./TaskList";
import UpdateScheduleForm from "./UpdateScheduleForm";
// import Dashboard from "./pages/Dashboard";

// import Schedule from "./pages/Schedule";
// import Reports from "./pages/Reports";
// import Employees from "./pages/Employees";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="content p-3 w-100">
          <Routes>
            <Route path="/login" element={< Login/>} />
            <Route path="/employees/register" element={<EmployeeRegister />} />
           <Route path="/employee/ForgotPassword" element={<ForgotPassword />} />
           <Route path="/taskslist" element={<TaskList/>} />

          
          <Route path="/update-schedule" element={<UpdateScheduleForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
