import PropTypes from 'prop-types'; // Import PropTypes
import { useState, useMemo,useRef } from "react";

export const Projects = () => {
  const titleRef=useRef('')
  const optionRef=useRef('')
  const [tasks, setTasks] = useState({
    Todo: [
      {
        id: 1,
        title: "task 1",
        categorys: "todo",
      },
      {
        id: 15,
        title: "task 5",
        categorys: "todo",
      },
    ],
    progress: [
      {
        id: 3,
        title: "task 6",
        categorys: "progress",
      },
      {
        id: 12,
        title: "task 12",
        categorys: "progress",
      },
    ],
    complete: [
      {
        id: 10,
        title: "task 17",
        categorys: "complete",
      },
    ],
  });

  // Getting the categories (Todo, progress, complete) dynamically
  const categories = useMemo(() => {
    return Object.keys(tasks);
  }, [tasks]);
  const handleSubmit=(e)=>{
e.preventDefault()
const payload={
  id:self.crypto.randomUUID(),
  title:titleRef.current.value,
  categorys:optionRef.current.value
}
if('mode'=='add'){
  addHander(payload)
}else{
  EditHandler(payload)
}
  }
const addHander=(payload)=>{
const templist=[...tasks[payload.categorys]]
templist.push(payload)
setTasks(prevState=>(
  {
    ...prevState,[payload.categorys]:templist
  }
))

}
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <h1 style={{ opacity: "0.1" }}>Projects</h1>
<form onSubmit={handleSubmit}>
  <input ref={titleRef} type="text" name="" id="" placeholder='enter task' style={{color:'red'}}/>
  <label htmlFor="">select category:
  <select ref={optionRef} name="choose one" id="" style={{color:'red'}}>
      <option value="">Todo</option>
        <option value="">progress</option>
     <option value="">Complete</option>
    </select>
  </label>
  <button type="submit" inputMode='add'>Add Task</button>
</form>
      {categories.map((category) => (
        // Pass category name to TaskList component
        <TaskList key={category} names={category}>
          {tasks[category].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskList>
      ))}
    </div>
  );
};

// TaskList component will render a list of tasks for a specific category
const TaskList = ({ names, children }) => {
  return (
    <div>
      <h2>{names}</h2> {/* Display the name of the category etc "Todo","Progress","Completed" */}
      <div>{children}</div>{/* cards*/}
    </div>
  );
};

// Adding PropTypes validation for TaskList
TaskList.propTypes = {
  names: PropTypes.string.isRequired, // Validate 'names' as required string
  children: PropTypes.node.isRequired, // Validate 'children' as required
};

// TaskCard component will render each task
const TaskCard = ({ task }) => {
  return (
    <div>
      <p>{task.title}</p>
    </div>
  );
};

// Adding PropTypes validation for TaskCard
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    categorys: PropTypes.string.isRequired,
  }).isRequired,
};
