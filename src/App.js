import React, { useState,useEffect } from 'react';



const App = () => {
  const [task, setTask] = useState(''); 
  const [pendingTasks, setPendingTasks] = useState(() => {
    const saved = localStorage.getItem('pendingTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  }); 

  useEffect(() => {
    const savedPendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setPendingTasks(savedPendingTasks);
    setCompletedTasks(savedCompletedTasks);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [pendingTasks, completedTasks]);


  const addNewTask = () => {
    if (task.trim()) { 
      setPendingTasks([...pendingTasks, task]); 
      setTask(''); 
    }
  };


  const taskCompleted = (index) => {
    const taskToComplete = pendingTasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]); 
    setPendingTasks(pendingTasks.filter((_, i) => i !== index)); 
  };

 
  const taskPending = (index) => {
    const taskToPending = completedTasks[index];
    setPendingTasks([...pendingTasks, taskToPending]); 
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));  
  };

 
  const removeTask = (index, listType) => {
    if (listType === 'pending') {
      setPendingTasks(pendingTasks.filter((_, i) => i !== index));
    } else if (listType === 'completed') {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='container'> 
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Enter a task"
      />
      <button onClick={addNewTask}>Add</button>

      <h2>Pending Tasks ({pendingTasks.length})</h2>
      <ul>
        {pendingTasks.map((task, index) => (
          <li 
            key={`pending-${index}`} 
            style={{ cursor: 'pointer' }}
          >
            {task}
            <div className='toggle-btn'>
            <button 
              onClick={() => taskCompleted(index)} 
              style={{ marginLeft: '10px' }}
            >
              Complete
            </button>
            <button 
              onClick={() => removeTask(index, 'pending')} 
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks ({completedTasks.length})</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li 
            key={`completed-${index}`} 
            style={{ cursor: 'pointer' }}
          >
            {task}
            <div className='toggle-btn'>
            <button 
              onClick={() => taskPending(index)} 
              style={{ marginLeft: '10px' }}
            >
              Revert
            </button>
            <button 
              onClick={() => removeTask(index, 'completed')} 
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
