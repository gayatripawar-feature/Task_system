

// // updated : 

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const TaskList = () => {
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate(); // Initialize the navigate hook

//   useEffect(() => {
//     // Get the user data from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) {
//       setUserName(userData.name); // Set the user's name
//     }
//   }, []); // Empty dependency array ensures this runs once when the component mounts

//   const handleUploadSchedule = () => {
//     // Navigate to the new page
//     navigate("/update-schedule"); // Change the path to the desired page
//   };

//   return (
//     <div>
//       <h1>Welcome, {userName}!</h1>
//       <div>
//         {/* Table structure */}
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Task Name</th>
//               <th>Time</th>
//               <th>Estimated Duration</th>
//               <th>Actual Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Example Task 1</td>
//               <td>9:00 AM</td>
//               <td>60 min</td>
//               <td>60 min</td>
//             </tr>
//             <tr>
//               <td>Example Task 2</td>
//               <td>10:00 AM</td>
//               <td>30 min</td>
//               <td>Pending</td>
//             </tr>
//             {/* Add more rows here if needed */}
//           </tbody>
//         </table>
//         {/* Upload button */}
//         <button onClick={handleUploadSchedule}>Upload Schedule</button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;




// ===

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Assuming you're using axios for HTTP requests

// const TaskList = () => {
//   const [userName, setUserName] = useState("");
//   const [tasks, setTasks] = useState([]); // State to store the tasks
//   const navigate = useNavigate(); // Initialize the navigate hook

//   useEffect(() => {
//     // Get the user data from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) {
//       setUserName(userData.name); // Set the user's name
//     }

//     // Fetch tasks from the backend
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("/api/tasks"); // Replace with your API endpoint
//         setTasks(response.data); // Assuming response.data contains the list of tasks
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks(); // Fetch tasks when the component mounts
//   }, []); // Empty dependency array ensures this runs once when the component mounts

//   const handleUploadSchedule = () => {
//     // Navigate to the new page
//     navigate("/update-schedule"); // Change the path to the desired page
//   };

//   return (
//     <div>
//       <h1>Welcome, {userName}!</h1>
//       <div>
//         {/* Table structure */}
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Task Name</th>
//               <th>Time</th>
//               <th>Estimated Duration</th>
//               <th>Actual Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Dynamically render tasks */}
//             {tasks.map((task, index) => (
//               <tr key={index}>
//                 <td>{task.taskName}</td>
//                 <td>{task.taskStartTime} - {task.taskEndTime}</td>
//                 <td>{task.estimatedDuration ? task.estimatedDuration : "Pending"}</td>
//                 <td>{task.actualDuration ? task.actualDuration : "Pending"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Upload button */}
//         <button onClick={handleUploadSchedule}>Upload Schedule</button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for HTTP requests

const TaskList = () => {
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    // Get the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserName(userData.name); // Set the user's name from localStorage
    }

  //   // Fetch tasks from the backend
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("/api/tasks");
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Send token in Authorization header
  //       },
  //       console.log(response.data); // Log the response to see the structure
  //       setTasks(response.data); // Assuming response.data contains the list of tasks
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks(); 
  // }, []); 

  // Fetch tasks from the backend
// Fetch tasks from the backend
const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      throw new Error("No token found.");
    }

    const response = await axios.get("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });

    console.log(response.data); // Log the response to see the structure
    // Ensure tasks is always an array before setting it
    setTasks(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    setTasks([]); // In case of error, set tasks to an empty array
  }
};


fetchTasks();
  },[]);

  const handleUploadSchedule = () => {
    // Navigate to the new page
    navigate("/update-schedule"); // Change the path to the desired page
  };

  // Function to render task rows
  const renderTaskRow = (task, index) => {
    return (
      <tr key={index}>
        <td>{task.taskName}</td>
        <td>{task.taskStartTime} - {task.taskEndTime}</td>
        <td>{task.estimatedDuration ? task.estimatedDuration : "Pending"}</td>
        <td>{task.actualDuration ? task.actualDuration : "Pending"}</td>
      </tr>
    );
  };

  // Function to render message if no tasks are available
  const renderNoTasks = () => {
    return (
      <tr>
        <td colSpan="4" className="text-center">No tasks available.</td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <div>
        {/* Table structure */}
        <table className="table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Time</th>
              <th>Estimated Duration</th>
              <th>Actual Duration</th>
            </tr>
          </thead>
          <tbody>
            {/* Conditional rendering based on whether there are tasks */}
            {tasks.length > 0 ? (
              tasks.map(renderTaskRow) // Use custom function to render task rows
            ) : (
              renderNoTasks() // Show a message when no tasks exist
            )}
          </tbody>
        </table>
        {/* Upload button */}
        <button onClick={handleUploadSchedule}>Upload Schedule</button>
      </div>
    </div>
  );
};

export default TaskList;
