import PropTypes from "prop-types"; // Import PropTypes
import { useState, useMemo, useRef } from "react";

export const Projects = () => {
  const [isEditing, setIsEditing] = useState("add");
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
  console.log("cat:", categories);

  const addHander = (payload) => {
    console.log(payload);
    //get the tasks which are present in that category
    const templist = [...(tasks[payload.categorys] || [])];
    console.log("categories:", ...tasks[payload.categorys]);

    console.log("Before templist:", templist);
    //push the added data(payload) to that category
    templist.push(payload);
    //update ui to have the current data
    setTasks((prevState) => ({
      ...prevState,
      [payload.categorys]: templist,
    }));
    console.log("here is the category", [payload.categorys]);
    console.log("what is here", ([payload.categorys] = templist));

    console.log("this is after:", templist);
  };

  const EditHandler = (payload) => {
    const oldTask = isEditing;
    //create new task object
    const newTask = payload;
    //remove what from the old list
    const oldList = tasks[oldTask.categorys].map(
      (task) => task.id !== newTask.id
    );
    //add it to the new list
    const newList = [...tasks[newTask.categorys]];
    //add new task
    newList.push(newTask);
    setTasks((prev) => ({
      ...prev,
      [payload.categorys]: newList,
      [payload.oldTask.categorys]: oldList,
    }));
    setIsEditing(undefined);
  };
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <h1 style={{ opacity: "0.1" }}>Projects</h1>
      <TaskForm
        mode={isEditing ? "edit" : "add"}
        task={EditHandler}
        addHander={addHander}
      />
      {categories.map((category) => (
        // Pass category name to TaskList component
        <TaskList key={category} names={category}>
          {tasks[category].map((task) => (
            <TaskCard key={task.id} task={task} setIsEditing={setIsEditing} />
          ))}
        </TaskList>
      ))}
    </div>
  );
};
const TaskForm = ({ addHander, mode = "add", EditHandler, task }) => {
  const titleRef = useRef("");
  const optionRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: mode === "add" ? self.crypto.randomUUID() : task.id,
      title: titleRef.current.value,
      categorys: optionRef.current.value,
    };
    const mode = e.target.getAttribute("mode");
    if (mode == "add") {
      addHander(payload);
    } else if (mode == "edit") {
      EditHandler(payload);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          type="text"
          name=""
          id=""
          placeholder="enter task"
          style={{ color: "red" }}
        />
        <label htmlFor="">
          select category:
          <select
            ref={optionRef}
            name="choose one"
            id=""
            style={{ color: "red" }}
          >
            <option value="Todo">Todo</option>
            <option value="progress">progress</option>
            <option value="complete">complete</option>
          </select>
        </label>
        <button type="submit" mode="add">
          Add Task
        </button>
      </form>
    </div>
  );
};

// TaskList component will render a list of tasks for a specific category
const TaskList = ({ names, children }) => {
  return (
    <div>
      <h2>{names}</h2>{" "}
      {/* Display the name of the category etc "Todo","Progress","Completed" */}
      <div>{children}</div>
      {/* cards*/}
    </div>
  );
};

// Adding PropTypes validation for TaskList
TaskList.propTypes = {
  names: PropTypes.string.isRequired, // Validate 'names' as required string
  children: PropTypes.node.isRequired, // Validate 'children' as required
};

// TaskCard component will render each task
const TaskCard = ({ task, setIsEditing }) => {
  return (
    <div>
      <p>{task.title}</p>
      <button type="submit" mode="edit" onClick={() => setIsEditing(task)}>
        Edit
      </button>
    </div>
  );
};

// Adding PropTypes validation for TaskCard
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    setIsEditing: PropTypes.func.isRequired,
  }).isRequired,
};
