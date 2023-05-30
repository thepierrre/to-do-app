import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { v4 as uuidv4 } from "uuid";

import Header from "./components/Layout/Header";
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TaskList/TaskList";
import Calendar from "./components/TaskList/Calendar";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";

const date = DateTime.local(2023, 6, 10);

export const formattedDate = date.toLocaleString({
  month: "short",
  day: "numeric",
  year: "numeric",
});

let DUMMY_TASKS = [
  {
    id: 1,
    text: "Learn Spanish for 20 minutes",
    date: formattedDate,
    tag: "Languages",
    isDone: false,
  },
  {
    id: 2,
    text: "Do lower body training in the gym",
    date: formattedDate,
    tag: "Sport",
    isDone: false,
  },
  {
    id: 3,
    text: "Learn programming for 2 hours",
    date: formattedDate,
    tag: "Coding",
    isDone: false,
  },
  {
    id: 4,
    text: "Bake a wholegrain bread",
    date: formattedDate,
    tag: "Baking",
    isDone: false,
  },
  {
    id: 5,
    text: "Return Amazon items",
    date: formattedDate,
    tag: "Other",
    isDone: false,
  },
  {
    id: 6,
    text: "Read 30 pages of the book",
    date: formattedDate,
    tag: "Reading",
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

const tags = {};
const tagsColors = [
  "#B2A4FF",
  "#FFB4B4",
  "#804674",
  "#FFD966",
  "#C7E9B0",
  "#8EA7E9",
  "#FD8A8A",
  "#9E7676",
  "#CDFCF6",
  "#FF8AAE",
  "#D9D7F1",
  "#79B4B7",
];

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [sideBarIsShown, setSideBarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");
  const [tagColor, setTagColor] = useState(undefined);

  const showCalendarHandler = () => {
    setCalendarIsShown(true);
  };

  const handleDayClick = (day, { selectedDay }) => {
    setSelectedDay(selectedDay ? undefined : day);
  };

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const tagInputChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

  const formattedDate = selectedDay
    ? selectedDay.toLocaleDateString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "no date";

  const getRandomColor = () => {
    return tagsColors[Math.floor(Math.random() * tagsColors.length)];
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const newTask = {
        id: uuidv4(),
        text: enteredTask,
        date: formattedDate,
        tag: enteredTag ? enteredTag : "no tag",
        isDone: false,
      };

      const color = getRandomColor();
      if (enteredTag && !tags[enteredTag]) {
        // const color = getRandomColor();
        tags[enteredTag] = {
          color,
          id: `${newTask.id}tag`,
        };
        let usedColorIndex = tagsColors.indexOf(color);
        tagsColors.splice(usedColorIndex, 1);
        console.log(tags);
        console.log(tags[enteredTag].color);
        // setTagColor(color);
      }
      setTagColor(color);

      setTasks((prevTasks) => [newTask, ...prevTasks]);

      localStorage.setItem("tasks", JSON.stringify([newTask, ...tasks]));

      setEnteredTask("");
      setEnteredTag("");
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
      return updatedTasks;
    });
  };

  const removeTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
      return updatedTasks;
    });
  };

  const toggleSideBar = () => {
    setSideBarIsShown(!sideBarIsShown);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks", JSON.stringify(tasks));
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="app">
      <Header toggleSideBar={toggleSideBar} sideBarIsShown={sideBarIsShown} />
      {sideBarIsShown && <SideBar TASKS={DUMMY_TASKS} LISTS={DUMMY_LISTS} />}
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        tagInputChangeHandler={tagInputChangeHandler}
        addNewTaskHandler={addNewTaskHandler}
        addNewTaskOnEnterHandler={addNewTaskOnEnterHandler}
        showCalendarHandler={showCalendarHandler}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
        tagColor={tagColor}
        enteredTask={enteredTask}
        enteredTag={enteredTag}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={tasks}
        tags={tags}
        tagColor={tagColor}
      />
    </div>
  );
}

export default App;
