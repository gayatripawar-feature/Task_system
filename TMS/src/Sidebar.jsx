import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [role, setRole] = useState("Employee"); // Default role
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle

  // Define menus based on role
  const menus = {
    Employee: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Login", path: "/login" },
      
      { name: "My Schedule", path: "/schedule" },
      { name: "My Reports", path: "/reports" },
      { name: "Notifications", path: "/notifications" },
      { name: "Settings", path: "/settings" },
    ],
    Admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manage Employees", path: "/employees" },
      { name: "Task Overview", path: "/task-overview" },
      { name: "Reports & Analytics", path: "/analytics" },
      { name: "Notifications", path: "/notifications" },
    ],
    EA: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Assign Tasks", path: "/assign-tasks" },
      { name: "Task Monitoring", path: "/task-monitoring" },
      { name: "Reports", path: "/reports" },
      { name: "Notifications", path: "/notifications" },
    ],
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-dark text-white p-3 ${isOpen ? "w-100" : "w-10"}`} style={{ height: "100vh" }}>
        <Button variant="light" className="mb-3" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </Button>
        
        {/* Role Selection */}
        <Dropdown>
          <Dropdown.Toggle variant="light">{role}</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(menus).map((r) => (
              <Dropdown.Item key={r} onClick={() => setRole(r)}>
                {r}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Sidebar Menu */}
        <Nav className="flex-column mt-3">
          {menus[role].map((item, index) => (
            <Nav.Link as={Link} to={item.path} key={index} className="text-white">
              {item.name}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
