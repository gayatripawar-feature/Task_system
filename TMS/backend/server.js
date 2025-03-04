// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require("body-parser");
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';

// require('dotenv').config(); 
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if using another username
  password: "root", // Add your MySQL password
  database: "tms_system", // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});


const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  console.log('Token received:', token);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // jwt.verify(token, 'mysecretkey12345', (err, decoded) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  

    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    
    req.userId = decoded.user_id; // Assuming `id` is stored in the token, or use `user_id`
    console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

    console.log('Authenticated user ID:', req.userId);
    next(); // Proceed to the next middleware or route handler
  });
};


// ✅ Register API Endpoint (Storing Plain Password)
app.post("/api/employees/register", async (req, res) => {
  const { name, email, password, phoneNumber, userRole, dob } = req.body;

  if (!name || !email || !password || !phoneNumber || !userRole || !dob) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Database error!" });

      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "Email already registered!" });
      }

      // ❌ Storing password as plain text (Not Recommended)
      db.query(
        "INSERT INTO users (name, email, password, phone_number, user_role, dob) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, password, phoneNumber, userRole, dob], 
        (err, result) => {
          if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ success: false, message: "Registration failed!" });
          }
          res.status(201).json({ success: true, message: "Employee registered successfully!" });
        }
      );
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

 

// / ✅ Login API (Check Email & Password)
app.post("/api/employees/login", (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and Password are required!" });
    }
  
    db.query("SELECT * FROM users WHERE name = ?", [username], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Database error!" });
  
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid username or password!" });
      }
  
      const user = results[0];
  
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid username or password!" });
      }
  
      res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          phoneNumber: user.ph_no,
          role: user.user_role,
          assignedBy: user.assigned_by,
          dob: user.dob,
        },
      });
    });
  });
  
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);



























// // API to post schedule
// app.post("/api/schedule", authenticateUser, (req, res) => {
//   const userId = req.user.id; // From the verified token
//   const { date, taskName, category, priority, dueDate, day, endTime, repeatType, assignedBy, timeSlots, tasks } = req.body;

//   // Validation
//   if (!date || !taskName || !timeSlots.length) {
//     return res.status(400).json({ message: "Required fields are missing" });
//   }

//   // Insert the task into the tasks table
//   const insertTaskQuery = `
//     INSERT INTO tasks (user_id, date, task_name, category, priority, due_date, day, end_time, repeat_type, assigned_by)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(insertTaskQuery, [userId, date, taskName, category, priority, dueDate, day, endTime, repeatType, assignedBy], (err, result) => {
//     if (err) {
//       console.error("Error inserting task:", err);
//       return res.status(500).json({ message: "Error inserting task" });
//     }

//     const taskId = result.insertId;

//     // Insert time slots for the task
//     const taskEntries = [];
//     timeSlots.forEach((slot) => {
//       tasks[slot].forEach((task) => {
//         taskEntries.push([taskId, slot, task]);
//       });
//     });

//     const insertTimeSlotQuery = `
//       INSERT INTO task_times (task_id, time_slot, task_detail)
//       VALUES ?`;

//     db.query(insertTimeSlotQuery, [taskEntries], (err) => {
//       if (err) {
//         console.error("Error inserting time slots:", err);
//         return res.status(500).json({ message: "Error saving tasks" });
//       }

//       res.status(201).json({ message: "Schedule uploaded successfully" });
//     });
//   });
// });


// // API to add or update a schedule
// router.post('/update-schedule', (req, res) => {
//   const { date, category, priority, repeatType, timeSlots, userName } = req.body;

//   // Insert the schedule details (if necessary)
//   const scheduleQuery = `
//     INSERT INTO week (date, category, priority, repeat_type, created_by)
//     VALUES (?, ?, ?, ?, ?)
//   `;
  
//   db.query(scheduleQuery, [date, category, priority, repeatType, userName], (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: 'Error saving schedule', error: err });
//     }

//     const scheduleId = result.insertId;

//     // Now insert the time slots and tasks
//     timeSlots.forEach(slot => {
//       const { time, day, startTime, endTime, tasks } = slot;

//       // Insert each time slot
//       const slotQuery = `
//         INSERT INTO tasks (time, day, start_time, end_time, repeat_type, category, priority, assigned_by, weekly_schedule_id)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;
      
//       db.query(slotQuery, [time, day, startTime, endTime, repeatType, category, priority, userName, scheduleId], (err, result) => {
//         if (err) {
//           return res.status(500).send({ message: 'Error saving time slot', error: err });
//         }

//         const slotId = result.insertId;

//         // Insert each task in the time slot
//         tasks.forEach(task => {
//           const { taskName, taskStartTime, taskEndTime, assignedBy, priority } = task;

//           const taskQuery = `
//             INSERT INTO tasks (task_name, start_time, end_time, assigned_by, priority, weekly_schedule_id)
//             VALUES (?, ?, ?, ?, ?, ?)
//           `;
          
//           db.query(taskQuery, [taskName, taskStartTime, taskEndTime, assignedBy, priority, slotId], (err) => {
//             if (err) {
//               return res.status(500).send({ message: 'Error saving task', error: err });
//             }
//           });
//         });
//       });
//     });

//     res.status(200).send({ message: 'Schedule updated successfully' });
//   });
// });


// API to add or update a schedule
// router.post('/update-schedule', (req, res) => {
//   const { date, category, priority, repeatType, timeSlots, userName } = req.body;

//   // Insert the schedule details (if necessary)
//   const scheduleQuery = `
//     INSERT INTO week (date, category, priority, repeat_type, created_by)
//     VALUES (?, ?, ?, ?, ?)
//   `;
  
//   db.query(scheduleQuery, [date, category, priority, repeatType, userName], (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: 'Error saving schedule', error: err });
//     }

//     const scheduleId = result.insertId; // The ID of the newly inserted week schedule

//     // Now insert the time slots and tasks
//     timeSlots.forEach(slot => {
//       const { time, day, startTime, endTime, tasks } = slot;

//       // Insert each time slot in the time_slot table
//       const slotQuery = `
//         INSERT INTO time_slot (start_time, end_time, week_id)
//         VALUES (?, ?, ?)
//       `;
      
//       db.query(slotQuery, [startTime, endTime, scheduleId], (err, result) => {
//         if (err) {
//           return res.status(500).send({ message: 'Error saving time slot', error: err });
//         }

//         const slotId = result.insertId; // The ID of the newly inserted time slot

//         // Insert each task in the tasks_general table for this time slot
//         tasks.forEach(task => {
//           const { taskName, taskStartTime, taskEndTime, assignedBy, taskPriority } = task;

//           const taskQuery = `
//             INSERT INTO tasks_general (task_name, task_start_time, task_end_time, assigned_to, priority, time_slot_id)
//             VALUES (?, ?, ?, ?, ?, ?)
//           `;
          
//           db.query(taskQuery, [taskName, taskStartTime, taskEndTime, assignedBy, taskPriority, slotId], (err) => {
//             if (err) {
//               return res.status(500).send({ message: 'Error saving task', error: err });
//             }
//           });
//         });
//       });
//     });

//     res.status(200).send({ message: 'Schedule updated successfully' });
//   });
// });


// // API to add or update a schedule
// router.post('/update-schedule', (req, res) => {
//   const { date, category, priority, repeatType, timeSlots, userName } = req.body;

//   console.log("Received data:", req.body); // Log the entire request body

//   if (!date || !category || !priority || !repeatType || !timeSlots || !userName) {
//     return res.status(400).send({ message: 'Missing required fields' });
//   }

//   // Insert the schedule details (if necessary)
//   const scheduleQuery = `
//     INSERT INTO week (date, category, priority, repeat_type, created_by)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(scheduleQuery, [date, category, priority, repeatType, userName], (err, result) => {
//     if (err) {
//       console.error("Error inserting schedule:", err); // Log error if insert fails
//       return res.status(500).send({ message: 'Error saving schedule', error: err });
//     }

//     const scheduleId = result.insertId; // The ID of the newly inserted week schedule
//     console.log("Schedule inserted successfully, scheduleId:", scheduleId); // Log success

//     // Now insert the time slots and tasks
//     timeSlots.forEach(slot => {
//       const { time, day, startTime, endTime, tasks } = slot;

//       console.log("Processing time slot:", slot); // Log each time slot

//       // Insert each time slot in the time_slot table
//       const slotQuery = `
//         INSERT INTO time_slot (start_time, end_time, week_id)
//         VALUES (?, ?, ?)
//       `;

//       db.query(slotQuery, [startTime, endTime, scheduleId], (err, result) => {
//         if (err) {
//           console.error("Error inserting time slot:", err); // Log error if insert fails
//           return res.status(500).send({ message: 'Error saving time slot', error: err });
//         }

//         const slotId = result.insertId; // The ID of the newly inserted time slot
//         console.log("Time slot inserted successfully, slotId:", slotId); // Log success

//         // Insert each task in the tasks_general table for this time slot
//         tasks.forEach(task => {
//           const { taskName, taskStartTime, taskEndTime, assignedBy, taskPriority } = task;

//           console.log("Inserting task:", task); // Log each task

//           const taskQuery = `
//             INSERT INTO tasks_general (task_name, task_start_time, task_end_time, assigned_to, priority, time_slot_id)
//             VALUES (?, ?, ?, ?, ?, ?)
//           `;
          
//           db.query(taskQuery, [taskName, taskStartTime, taskEndTime, assignedBy, taskPriority, slotId], (err) => {
//             if (err) {
//               console.error("Error inserting task:", err); // Log error if insert fails
//               return res.status(500).send({ message: 'Error saving task', error: err });
//             }

//             console.log("Task inserted successfully for slotId:", slotId); // Log task insert success
//           });
//         });
//       });
//     });

//     res.status(200).send({ message: 'Schedule updated successfully' });
//   });
// });


app.post('/update-schedule', (req, res) => {
  const { date, category, priority, repeatType, timeSlots, userName } = req.body;

  console.log("Received data:", req.body); // Log the entire request body

  if (!date || !category || !priority || !repeatType || !timeSlots || !userName) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  // Insert the schedule details (if necessary)
  const scheduleQuery = `
    INSERT INTO week (date, category, priority, repeat_type, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(scheduleQuery, [date, category, priority, repeatType, userName], (err, result) => {
    if (err) {
      console.error("Error inserting schedule:", err); // Log error if insert fails
      return res.status(500).send({ message: 'Error saving schedule', error: err });
    }

    const scheduleId = result.insertId; // The ID of the newly inserted week schedule
    console.log("Schedule inserted successfully, scheduleId:", scheduleId); // Log success

    // Now insert the time slots and tasks
    timeSlots.forEach(slot => {
      const { time, day, startTime, endTime, tasks } = slot;

      console.log("Processing time slot:", slot); // Log each time slot

      // Insert each time slot in the time_slot table
      const slotQuery = `
        INSERT INTO time_slots (start_time, end_time, week_id)
        VALUES (?, ?, ?)
      `;

      db.query(slotQuery, [startTime, endTime, scheduleId], (err, result) => {
        if (err) {
          console.error("Error inserting time slot:", err); // Log error if insert fails
          return res.status(500).send({ message: 'Error saving time slot', error: err });
        }

        const slotId = result.insertId; // The ID of the newly inserted time slot
        console.log("Time slot inserted successfully, slotId:", slotId); // Log success

        // Insert each task in the tasks_general table for this time slot
        tasks.forEach(task => {
          const { taskName, taskStartTime, taskEndTime, assignedBy, taskPriority } = task;

          console.log("Inserting task:", task); // Log each task

          const taskQuery = `
            INSERT INTO tasks_general (task_name, task_start_time, task_end_time, assigned_to, priority, time_slot_id)
            VALUES (?, ?, ?, ?, ?, ?)
          `;

          db.query(taskQuery, [taskName, taskStartTime, taskEndTime, assignedBy, taskPriority, slotId], (err) => {
            if (err) {
              console.error("Error inserting task:", err); // Log error if insert fails
              return res.status(500).send({ message: 'Error saving task', error: err });
            }

            console.log("Task inserted successfully for slotId:", slotId); // Log task insert success
          });
        });
      });
    });

    res.status(200).send({ message: 'Schedule updated successfully' });
  });
});


// Define the /api/tasks route to get tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks_general'; // Replace with your actual table name and query
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.json(results); // Send the tasks data as JSON response
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
