import { useState } from "react";
import { DateTime } from "luxon";

import Header from "./components/Layout/Header";
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TaskList/TaskList";
import Calendar from "./components/TaskList/Calendar";
import SideBar from "./components/SideBar/SideBar";
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

let DUMMY_LISTS = [
  {
    id: 1,
    name: "List 1",
    tasks: [DUMMY_TASKS],
  },
  {
    id: 2,
    name: "List 2",
    tasks: [DUMMY_TASKS],
  },
  {
    id: 3,
    name: "List 3",
    tasks: [DUMMY_TASKS],
  },

];

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [sideBarIsShown, setSideBarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");

  const showCalendarHandler = () => {
    setCalendarIsShown(true);
  };

  const handleDayClick = (day, { selectedDay }) => {
    setSelectedDay(selectedDay ? undefined : day);
    console.log(
      day.toLocaleDateString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  };

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const tagInputChangeHandler = (event) => {
    setEnteredTag(event.target.value);
    console.log(event.target.value);
  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

  const enteredTagIsValid = enteredTag.trim().length !== 0;

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const newTask = {
        id: tasks.length + 1,
        text: enteredTask,
        date: selectedDay
          ? selectedDay.toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "no date",
        category: enteredTag ? enteredTag : "no tag",
        isDone: false,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setEnteredTask("");
    }
  };

  const addNewTaskOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      addNewTaskHandler(event);
    }
  };

  

  const markTaskAsDoneHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: true };
        } else {
          return task;
        }
      });

      // const doneTask = updatedTasks.find((task) => task.id === taskId && task.isDone)
      // if (doneTask) {
      //   const doneTaskIndex = updatedTasks.indexOf(doneTask);
      //   updatedTasks.push(updatedTasks.splice(doneTaskIndex, 1)[0]);
      // }

      return updatedTasks;
    });
  };

  const removeTaskHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    console.log(DUMMY_LISTS);
  };

  const toggleSideBar = () => {
    setSideBarIsShown(!sideBarIsShown);
  };

  return (
    <div className="app">
      <Header toggleSideBar={toggleSideBar} sideBarIsShown={sideBarIsShown} />
      {sideBarIsShown && <SideBar />}
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        tagInputChangeHandler={tagInputChangeHandler}
        addNewTaskHandler={addNewTaskHandler}
        addNewTaskOnEnterHandler={addNewTaskOnEnterHandler}
        showCalendarHandler={showCalendarHandler}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
