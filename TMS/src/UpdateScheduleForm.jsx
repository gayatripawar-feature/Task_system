



// import React, { useState } from 'react';
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const UpdateScheduleForm = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     taskName: '',
//     category: '',
//     priority: '',
//     dueDate: '',
//     day: '',
//     endTime: '',
//     repeatType: '',
//     assignedBy: '',
//     timeSlots: [],
//     tasks: {}
//   });

//   const [time, setTime] = useState('09:00');
//   const [loading, setLoading] = useState(false); // ✅ Added this
//   const [message, setMessage] = useState(''); // ✅ Added message state

//   const handleTimeChange = (e) => {
//     setTime(e.target.value);
//   };

//   const addTimeSlot = () => {
//     setFormData((prev) => {
//       const timeSlot = time;
//       return {
//         ...prev,
//         timeSlots: [...prev.timeSlots, timeSlot],
//         tasks: {
//           ...prev.tasks,
//           [timeSlot]: ['']
//         }
//       };
//     });
//   };

//   const removeTimeSlot = (index) => {
//     setFormData((prev) => {
//       const updatedTimeSlots = [...prev.timeSlots];
//       updatedTimeSlots.splice(index, 1);
//       const updatedTasks = { ...prev.tasks };
//       delete updatedTasks[prev.timeSlots[index]];

//       return {
//         ...prev,
//         timeSlots: updatedTimeSlots,
//         tasks: updatedTasks
//       };
//     });
//   };

//   const handleTaskChange = (index, taskIndex, value) => {
//     const updatedTasks = { ...formData.tasks };
//     updatedTasks[formData.timeSlots[index]][taskIndex] = value;
//     setFormData((prev) => ({ ...prev, tasks: updatedTasks }));
//   };

//   const handleAddTask = (index) => {
//     const updatedTasks = { ...formData.tasks };
//     updatedTasks[formData.timeSlots[index]].push('');
//     setFormData((prev) => ({ ...prev, tasks: updatedTasks }));
//   };

//   const categoryOptions = ['HR', 'Finance', 'IT', 'Sales'].map(dep => ({ value: dep, label: dep }));
//   const priorityOptions = ['High', 'Medium', 'Low', 'Critical'].map(p => ({ value: p, label: p }));
//   const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ value: day, label: day }));
//   const repeatTypeOptions = ['Weekly', 'Monthly', 'Yearly'].map(type => ({ value: type, label: type }));
//   const assignedByOptions = ['EA', 'Employee', 'Director'].map(role => ({ value: role, label: role }));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDropdownChange = (name, selectedOption) => {
//     setFormData((prev) => ({ ...prev, [name]: selectedOption.value }));
//   };

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
  

  

//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setMessage('No token found. Please log in.');
//       return;
//     }
  
//     const response = await fetch('http://localhost:5000/api/schedule', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     });
  
//     const data = await response.json();
//     if (response.ok) {
//       setMessage('Schedule uploaded successfully!');
//     } else {
//       setMessage(`Error: ${data.message || 'Unknown error'}`);
//     }
//   } catch (error) {
//     setMessage('Failed to connect to the server.');
//     console.error('Error:', error); // Log the error for further investigation
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Date:</label>
//             <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Task Name:</label>
//             <input type="text" className="form-control" name="taskName" value={formData.taskName} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Category:</label>
//             <Select options={categoryOptions} onChange={(option) => handleDropdownChange('category', option)} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Priority:</label>
//             <Select options={priorityOptions} onChange={(option) => handleDropdownChange('priority', option)} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Due Date:</label>
//             <input type="date" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Day:</label>
//             <Select options={dayOptions} onChange={(option) => handleDropdownChange('day', option)} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">End Time:</label>
//             <input type="time" className="form-control" name="endTime" value={formData.endTime} onChange={handleChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Repeat Type:</label>
//             <Select options={repeatTypeOptions} onChange={(option) => handleDropdownChange('repeatType', option)} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Assigned By:</label>
//             <Select options={assignedByOptions} onChange={(option) => handleDropdownChange('assignedBy', option)} />
//           </div>
//         </div>

//         <hr />
//         <h5 className="text-center">Time Slots & Tasks</h5>
//         <div className="text-center mb-3">
//           <input type="time" value={time} onChange={handleTimeChange} />
//           <button type="button" className="btn btn-success ms-2" onClick={addTimeSlot}>Add Time Slot</button>
//         </div>

//         {formData.timeSlots.map((slot, index) => (
//           <div key={index} className="row mb-3">
//             <div className="col-md-6">
//               <label className="form-label">Tasks for {slot}:</label>
//               {formData.tasks[slot].map((task, taskIndex) => (
//                 <textarea key={taskIndex} className="form-control mb-2" value={task} onChange={(e) => handleTaskChange(index, taskIndex, e.target.value)} />
//               ))}
//               <button type="button" className="btn btn-outline-primary" onClick={() => handleAddTask(index)}>+ Add Task</button>
//             </div>
//             <div className="col-md-6">
//               <button type="button" className="btn btn-danger mt-4" onClick={() => removeTimeSlot(index)}>Remove</button>
//             </div>
//           </div>
//         ))}

//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">Upload Schedule</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateScheduleForm;





// import React, { useState } from 'react';
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const UpdateScheduleForm = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     category: '',
//     priority: '',
//     repeatType: '',
//     timeSlots: []
//   });

//   const [time, setTime] = useState({ startTime: '09:00', endTime: '10:00', day: '' });

//   const handleTimeChange = (e) => {
//     setTime({ ...time, [e.target.name]: e.target.value });
//   };

//   const addTimeSlot = () => {
//     setFormData((prev) => ({
//       ...prev,
//       timeSlots: [...prev.timeSlots, { ...time, tasks: [] }]
//     }));
//   };

//   const removeTimeSlot = (index) => {
//     setFormData((prev) => {
//       const updatedTimeSlots = prev.timeSlots.filter((_, i) => i !== index);
//       return { ...prev, timeSlots: updatedTimeSlots };
//     });
//   };

//   const handleTaskChange = (slotIndex, taskIndex, field, value) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks[taskIndex][field] = value;
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const addTaskToSlot = (slotIndex) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks.push({ taskName: '', assignedBy: '', taskStartTime: '', taskEndTime: '', priority: '' });
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const removeTaskFromSlot = (slotIndex, taskIndex) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks.splice(taskIndex, 1);
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({ value: day, label: day }));
//   const categoryOptions = ['HR', 'Finance', 'IT', 'Sales'].map(dep => ({ value: dep, label: dep }));
//   const priorityOptions = ['High', 'Medium', 'Low', 'Critical'].map(p => ({ value: p, label: p }));
//   const repeatTypeOptions = ['Weekly', 'Monthly', 'Yearly'].map(type => ({ value: type, label: type }));
//   const assignedByOptions = ['EA', 'Employee', 'Director'].map(role => ({ value: role, label: role }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting:', formData);
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit}>
//         <h4 className="text-center">Update Schedule Form</h4>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Date:</label>
//             <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Category:</label>
//             <Select options={categoryOptions} onChange={(option) => setFormData({ ...formData, category: option.value })} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Priority:</label>
//             <Select options={priorityOptions} onChange={(option) => setFormData({ ...formData, priority: option.value })} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Repeat Type:</label>
//             <Select options={repeatTypeOptions} onChange={(option) => setFormData({ ...formData, repeatType: option.value })} />
//           </div>
//         </div>

//         <h5 className="text-center">Time Slots & Tasks</h5>
//         <div className="mb-3">
//           <Select options={daysOptions} onChange={(option) => setTime({ ...time, day: option.value })} placeholder="Select Day" />
//           <label className="form-label">Start Time:</label>
//           <input type="time" name="startTime" value={time.startTime} onChange={handleTimeChange} className="ms-2" />
            
//   <label className="form-label">End Time:</label>
//           <input type="time" name="endTime" value={time.endTime} onChange={handleTimeChange} className="ms-2" />
//           <button type="button" className="btn btn-success ms-2" onClick={addTimeSlot}>✔ Add Time Slot</button>
//         </div>

//         {formData.timeSlots.map((slot, index) => (
//           <div key={index} className="mb-3 p-3 border rounded">
//             <h6>{slot.day}: {slot.startTime} - {slot.endTime}</h6>
//             {slot.tasks.map((task, taskIndex) => (
//               <div key={taskIndex} className="row mb-2">
         

// <div className="row mb-2">
//   <div className="col-md-2">
//     <label className="form-label">Task Name:</label>
//     <input
//       type="text"
//       className="form-control"
//       placeholder="Task Name"
//       value={task.taskName}
//       onChange={(e) => handleTaskChange(index, taskIndex, 'taskName', e.target.value)}
//     />
//   </div>
  
//   <div className="col-md-2">
//     <label className="form-label">Priority:</label>
//     <Select options={priorityOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'priority', option.value)} />
//   </div>

//   <div className="col-md-2">
//     <label className="form-label">Start Time:</label>
//     <input
//       type="time"
//       className="form-control"
//       value={task.taskStartTime}
//       onChange={(e) => handleTaskChange(index, taskIndex, 'taskStartTime', e.target.value)}
//     />
//   </div>

//   <div className="col-md-2">
//     <label className="form-label">End Time:</label>
//     <input
//       type="time"
//       className="form-control"
//       value={task.taskEndTime}
//       onChange={(e) => handleTaskChange(index, taskIndex, 'taskEndTime', e.target.value)}
//     />
//   </div>

//   <div className="col-md-2">
//     <label className="form-label">Assigned By:</label>
//     <Select options={assignedByOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'assignedBy', option.value)} />
//   </div>

//   <div className="col-md-2">
//     <label className="form-label">Action:</label>
//     <button type="button" className="btn btn-danger" onClick={() => removeTaskFromSlot(index, taskIndex)}>
//       ❌
//     </button>
//   </div>
// </div>

//               </div>
//             ))}
//             <button type="button" className="btn btn-outline-primary" onClick={() => addTaskToSlot(index)}>➕ Add Task</button>
//             <button type="button" className="btn btn-danger ms-2" onClick={() => removeTimeSlot(index)}>🗑 Remove Time Slot</button>
//           </div>
//         ))}

//         <button type="submit" className="btn btn-primary">📩 Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateScheduleForm;



// import React, { useState } from 'react';
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const UpdateScheduleForm = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     category: '',
//     priority: '',
//     repeatType: '',
//     timeSlots: []
//   });

//   const [time, setTime] = useState({ startTime: '09:00', endTime: '10:00', day: '' });

//   const handleTimeChange = (e) => {
//     setTime({ ...time, [e.target.name]: e.target.value });
//   };

//   const addTimeSlot = () => {
//     setFormData((prev) => ({
//       ...prev,
//       timeSlots: [...prev.timeSlots, { ...time, tasks: [] }]
//     }));
//   };

//   const removeTimeSlot = (index) => {
//     setFormData((prev) => {
//       const updatedTimeSlots = prev.timeSlots.filter((_, i) => i !== index);
//       return { ...prev, timeSlots: updatedTimeSlots };
//     });
//   };

//   const handleTaskChange = (slotIndex, taskIndex, field, value) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks[taskIndex][field] = value;
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const addTaskToSlot = (slotIndex) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks.push({ taskName: '', assignedBy: '', taskStartTime: '', taskEndTime: '', priority: '' });
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const removeTaskFromSlot = (slotIndex, taskIndex) => {
//     const updatedTimeSlots = [...formData.timeSlots];
//     updatedTimeSlots[slotIndex].tasks.splice(taskIndex, 1);
//     setFormData({ ...formData, timeSlots: updatedTimeSlots });
//   };

//   const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({ value: day, label: day }));
//   const categoryOptions = ['HR', 'Finance', 'IT', 'Sales'].map(dep => ({ value: dep, label: dep }));
//   const priorityOptions = ['High', 'Medium', 'Low', 'Critical'].map(p => ({ value: p, label: p }));
//   const repeatTypeOptions = ['Weekly', 'Monthly', 'Yearly'].map(type => ({ value: type, label: type }));
//   const assignedByOptions = ['EA', 'Employee', 'Director'].map(role => ({ value: role, label: role }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting:', formData);
//   };

//   return (
//     <div className="container mt-5">
//       <form onSubmit={handleSubmit}>
//         <h4 className="text-center mb-4">Update Schedule Form</h4>

//         {/* Basic Information Section */}
//         <div className="row mb-4">
//           <div className="col-md-6">
//             <label className="form-label">Date:</label>
//             <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Category:</label>
//             <Select options={categoryOptions} onChange={(option) => setFormData({ ...formData, category: option.value })} />
//           </div>
//         </div>

//         <div className="row mb-4">
//           <div className="col-md-6">
//             <label className="form-label">Priority:</label>
//             <Select options={priorityOptions} onChange={(option) => setFormData({ ...formData, priority: option.value })} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Repeat Type:</label>
//             <Select options={repeatTypeOptions} onChange={(option) => setFormData({ ...formData, repeatType: option.value })} />
//           </div>
//         </div>

//         {/* Time Slot Section */}
//         <h5 className="text-center mt-4 mb-3">Time Slots</h5>
//         <div className="mb-4">
//           <Select options={daysOptions} onChange={(option) => setTime({ ...time, day: option.value })} placeholder="Select Day" />
//           <div className="d-flex align-items-center mt-2">
//             <div className="me-3">
//               <label className="form-label">Start Time:</label>
//               <input type="time" name="startTime" value={time.startTime} onChange={handleTimeChange} />
//             </div>
//             <div>
//               <label className="form-label">End Time:</label>
//               <input type="time" name="endTime" value={time.endTime} onChange={handleTimeChange} />
//             </div>
//           </div>
//           <button type="button" className="btn btn-success mt-3" onClick={addTimeSlot}>✔ Add Time Slot</button>
//         </div>

//         {/* Time Slots and Tasks */}
//         {formData.timeSlots.map((slot, index) => (
//           <div key={index} className="mb-4 p-3 border rounded">
//             <h6>{slot.day}: {slot.startTime} - {slot.endTime}</h6>

//             {/* Tasks Section */}
//             {slot.tasks.length > 0 && (
//               <div className="mb-3">
//                 <h6>Tasks</h6>
//                 {slot.tasks.map((task, taskIndex) => (
//                   <div key={taskIndex} className="row mb-3">
//                     <div className="col-md-2">
//                       <label className="form-label">Task Name:</label>
//                       <input type="text" className="form-control" placeholder="Task Name" value={task.taskName} onChange={(e) => handleTaskChange(index, taskIndex, 'taskName', e.target.value)} />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label">Priority:</label>
//                       <Select options={priorityOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'priority', option.value)} />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label">Start Time:</label>
//                       <input type="time" className="form-control" value={task.taskStartTime} onChange={(e) => handleTaskChange(index, taskIndex, 'taskStartTime', e.target.value)} />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label">End Time:</label>
//                       <input type="time" className="form-control" value={task.taskEndTime} onChange={(e) => handleTaskChange(index, taskIndex, 'taskEndTime', e.target.value)} />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label">Assigned By:</label>
//                       <Select options={assignedByOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'assignedBy', option.value)} />
//                     </div>
//                     <div className="col-md-2">
//                       <label className="form-label">Action:</label>
//                       <button type="button" className="btn btn-danger" onClick={() => removeTaskFromSlot(index, taskIndex)}>❌</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <button type="button" className="btn btn-outline-primary" onClick={() => addTaskToSlot(index)}>➕ Add Task</button>
//             <button type="button" className="btn btn-danger ms-2" onClick={() => removeTimeSlot(index)}>🗑 Remove Time Slot</button>
//           </div>
//         ))}

//         <button type="submit" className="btn btn-primary mt-3">📩 Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateScheduleForm;


import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateScheduleForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    priority: '',
    repeatType: '',
    timeSlots: []
  });

  const [time, setTime] = useState({ startTime: '09:00', endTime: '10:00', day: '' });
  const [userName, setUserName] = useState(''); // State to hold the logged-in username

  // Fetch logged-in username from localStorage when component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserName(userData.name); // Set the user's name
    }
  }, []);

  const handleTimeChange = (e) => {
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { ...time, tasks: [] }]
    }));
  };

  const removeTimeSlot = (index) => {
    setFormData((prev) => {
      const updatedTimeSlots = prev.timeSlots.filter((_, i) => i !== index);
      return { ...prev, timeSlots: updatedTimeSlots };
    });
  };

  const handleTaskChange = (slotIndex, taskIndex, field, value) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[slotIndex].tasks[taskIndex][field] = value;
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const addTaskToSlot = (slotIndex) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[slotIndex].tasks.push({ taskName: '', assignedBy: '', taskStartTime: '', taskEndTime: '', priority: '' });
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const removeTaskFromSlot = (slotIndex, taskIndex) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[slotIndex].tasks.splice(taskIndex, 1);
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({ value: day, label: day }));
  const categoryOptions = ['HR', 'Finance', 'IT', 'Sales'].map(dep => ({ value: dep, label: dep }));
  const priorityOptions = ['High', 'Medium', 'Low', 'Critical'].map(p => ({ value: p, label: p }));
  const repeatTypeOptions = ['Weekly', 'Monthly', 'Yearly'].map(type => ({ value: type, label: type }));
  const assignedByOptions = ['EA', 'Employee', 'Director'].map(role => ({ value: role, label: role }));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitting:', formData);
  //   // Show the alert here to confirm submission
  // alert('Schedule successfully submitted!');

  // // You can also log the formData to check the values
  // console.log('Form Data:', formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the form data
    const dataToSubmit = { ...formData, userName };
  
    console.log('Submitting:', dataToSubmit); // Log the data to check if everything is correct
    navigate('/taskslist');
    // Send the data to the backend
    try {
      const response = await fetch('http://localhost:5000/update-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(dataToSubmit), // Convert data to JSON string
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Display the server response message
        console.log('Server Response:', result);
      } else {
        throw new Error('Failed to submit the schedule');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the schedule.');
    }
  };
  
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Update Schedule Form</h4>

        {/* Display logged-in user's name */}
        {userName && <h5 className="text-center mb-4">Logged in as: {userName}</h5>}

        {/* Basic Information Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Date:</label>
            <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category:</label>
            <Select options={categoryOptions} onChange={(option) => setFormData({ ...formData, category: option.value })} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Priority:</label>
            <Select options={priorityOptions} onChange={(option) => setFormData({ ...formData, priority: option.value })} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Repeat Type:</label>
            <Select options={repeatTypeOptions} onChange={(option) => setFormData({ ...formData, repeatType: option.value })} />
          </div>
        </div>

        {/* Time Slot Section */}
        <h5 className="text-center mt-4 mb-3">Time Slots</h5>
        <div className="mb-4">
          <Select options={daysOptions} onChange={(option) => setTime({ ...time, day: option.value })} placeholder="Select Day" />
          <div className="d-flex align-items-center mt-2">
            <div className="me-3">
              <label className="form-label">Start Time:</label>
              <input type="time" name="startTime" value={time.startTime} onChange={handleTimeChange} />
            </div>
            <div>
              <label className="form-label">End Time:</label>
              <input type="time" name="endTime" value={time.endTime} onChange={handleTimeChange} />
            </div>
          </div>
          <button type="button" className="btn btn-success mt-3" onClick={addTimeSlot}>✔ Add Time Slot</button>
        </div>

        {/* Time Slots and Tasks */}
        {formData.timeSlots.map((slot, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <h6>{slot.day}: {slot.startTime} - {slot.endTime}</h6>

            {/* Tasks Section */}
            {slot.tasks.length > 0 && (
              <div className="mb-3">
                <h6>Tasks</h6>
                {slot.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="row mb-3">
                    <div className="col-md-2">
                      <label className="form-label">Task Name:</label>
                      <input type="text" className="form-control" placeholder="Task Name" value={task.taskName} onChange={(e) => handleTaskChange(index, taskIndex, 'taskName', e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Priority:</label>
                      <Select options={priorityOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'priority', option.value)} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Start Time:</label>
                      <input type="time" className="form-control" value={task.taskStartTime} onChange={(e) => handleTaskChange(index, taskIndex, 'taskStartTime', e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">End Time:</label>
                      <input type="time" className="form-control" value={task.taskEndTime} onChange={(e) => handleTaskChange(index, taskIndex, 'taskEndTime', e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Assigned By:</label>
                      <Select options={assignedByOptions} onChange={(option) => handleTaskChange(index, taskIndex, 'assignedBy', option.value)} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Action:</label>
                      <button type="button" className="btn btn-danger" onClick={() => removeTaskFromSlot(index, taskIndex)}>❌</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button type="button" className="btn btn-outline-primary" onClick={() => addTaskToSlot(index)}>➕ Add Task</button>
            <button type="button" className="btn btn-danger ms-2" onClick={() => removeTimeSlot(index)}>🗑 Remove Time Slot</button>
          </div>
        ))}

        {/* <button type="submit" className="btn btn-primary mt-3">📩 Submit</button> */}
        {/* <form onSubmit={handleSubmit}> */}
      {/* Your form fields here */}
      <button type="submit" className="btn btn-primary mt-3">
        📩 Submit
      </button>
    </form>
      {/* </form> */}
    </div>
  );
};

export default UpdateScheduleForm;
