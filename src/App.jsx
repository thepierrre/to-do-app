import { useState } from "react";
import { DateTime } from "luxon";

import Header from "./components/Layout/Header";
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TaskList/TaskList";
import Calendar from "./components/TaskList/Calendar";
import "./App.css";

const date = DateTime.local(2023, 6, 10);
const formattedDate = date.toLocaleString({
  month: "short",
  day: "numeric",
  year: "numeric",
});

let DUMMY_TASKS = [
  {
    id: 1,
    text: "Learn Spanish for 20 minutes",
    date: formattedDate,
    category: "Languages",
    isDone: false,
  },
  {
    id: 2,
    text: "Do lower body training in the gym",
    date: formattedDate,
    category: "Sport",
    isDone: false,
  },
  {
    id: 3,
    text: "Learn programming for 2 hours",
    date: formattedDate,
    category: "Coding",
    isDone: false,
  },
  {
    id: 4,
    text: "Bake a wholegrain bread",
    date: formattedDate,
    category: "Baking",
    isDone: false,
  },
  {
    id: 5,
    text: "Return Amazon items",
    date: formattedDate,
    category: "Other",
    isDone: false,
  },
  {
    id: 6,
    text: "Read 30 pages of the book",
    date: formattedDate,
    category: "Reading",
    isDone: false,
  },
];

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [calendarIsShown, setCalendarIsShown] = useState(false);

  const showCalendarHandler = () => {
    setCalendarIsShown(true);
  }

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);

  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const newTask = {
        id: tasks.length + 1,
        text: enteredTask,
        date: "None",
        category: "None",
        isDone: false,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
  };

  const markTaskAsDoneHandler = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: true };
        } else {
          return task;
        }
      });
    });
  };

  const removeTaskHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app">
      <Header />
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        addNewTaskHandler={addNewTaskHandler}
        showCalendarHandler={showCalendarHandler}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={tasks}
      />
      <Calendar />
    </div>
  );
}

export default App;
