import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { v4 as uuidv4 } from "uuid";

// import {
//   getSortedTasks,
//   getTasks,
//   sortByTimestamp,
//   tasks,
//   setTasks,
//   TEXT_SORT,
//   DESC_SORT,
//   ASC_SORT,
// } from "./helpers/sortingFunctions.js";

import { tagsColors } from "./helpers/dummy.js";
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

const tags = {};

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [sideBarIsShown, setSideBarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");
  const [tagColor, setTagColor] = useState(undefined);
  const [sortedByDone, setSortedByDone] = useState(false);
  const [sortedByTask, setSortedByTask] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedByTag, setSortedByTag] = useState(false);

  const [sortedBy, setSortedBy] = useState({
    feature: undefined,
    direction: undefined,
  });

  const DONE_SORT = "DONE";
  const TEXT_SORT = "TEXT";
  const TAG_SORT = "TAG";
  const DATE_SORT = "DATE";
  const DESC_SORT = "DESC";
  const ASC_SORT = "ASC";

  // const sortByTaskHandler = (tasks, getSortedTasks, useSortedState) => {
  //   getSortedTasks(tasks, TEXT_SORT);
  // };

  const sortByTimestamp = () => {
    const updatedTasks = [...tasks].sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      } else {
        return 0;
      }
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
  };

  const sortByTaskHandler = () => {
    if (!sortedBy.feature && !sortedBy.direction) {
      const updatedTasks = [...tasks].sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        } else if (a.text > b.text) {
          return 1;
        } else {
          return 0;
        }
      });
      setTasks(updatedTasks);
      setSortedBy({ feature: TEXT_SORT, direction: ASC_SORT });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    }
    if (sortedBy.feature === TEXT_SORT && sortedBy.direction === ASC_SORT) {
      const updatedTasks = [...tasks].sort((a, b) => {
        if (a.text < b.text) {
          return 1;
        } else if (a.text > b.text) {
          return -1;
        } else {
          return 0;
        }
      });
      setTasks(updatedTasks);
      setSortedBy({ feature: TEXT_SORT, direction: DESC_SORT });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    }
    if (sortedBy.feature === TEXT_SORT && sortedBy.direction === DESC_SORT) {
      sortByTimestamp();
      setSortedBy({ feature: undefined, direction: undefined });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    }
  };

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

  const getRandomColor = () => {
    return tagsColors[Math.floor(Math.random() * tagsColors.length)];
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const newTask = {
        id: uuidv4(),
        text: enteredTask,
        date: selectedDay
          ? selectedDay.toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "no date",
        tag: enteredTag ? enteredTag : "no tag",
        timestamp: new Date(),
        isDone: false,
      };

      const color = getRandomColor();
      if (enteredTag && !tags[enteredTag]) {
        tags[enteredTag] = {
          color,
        };
        let usedColorIndex = tagsColors.indexOf(color);
        tagsColors.splice(usedColorIndex, 1);
      }
      setTagColor(color);
      localStorage.setItem("tagColor", JSON.stringify(color));

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
          return { ...task, isDone: !task.isDone };
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

  const sortByDoneHandler = () => {
    if (!sortedByDone) {
      const updatedTasks = [...tasks].sort((a, b) => {
        if (a.isDone === true && b.isDone === false) {
          return 1;
        }
        if (a.isDone === false && b.isDone === true) {
          return -1;
        } else {
          return 0;
        }
      });
      setTasks(updatedTasks);
      setSortedByDone(!sortedByDone);
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    } else {
      sortByTimestamp();
      setSortedByDone(false);
    }
  };

  const sortByDateHandler = () => {
    setSortedByDone(false);
    setSortedByTask(false);
    setSortedByTag(false);
    if (!sortedByDate) {
      const updatedTasks = [...tasks].sort((a, b) => {
        if (a.date === "no date" && b.date === "no date") {
          return 0;
        } else if (a.date === "no date") {
          return 1;
        } else if (b.date === "no date") {
          return -1;
        }

        if (new Date(a.date) < new Date(b.date)) {
          return -1;
        } else if (new Date(a.date) > new Date(b.date)) {
          return 1;
        } else {
          return 0;
        }
      });
      setTasks(updatedTasks);
      setSortedByDate(!sortedByDate);
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    } else if (sortedByDate) {
      sortByTimestamp();
      setSortedByDate(false);
    }
  };

  const sortByTagHandler = () => {
    setSortedByDone(false);
    setSortedByTask(false);
    setSortedByDate(false);
    if (!sortedByTag) {
      const updatedTasks = [...tasks].sort((a, b) => {
        if (a.tag < b.tag) {
          return -1;
        } else if (a.tag > b.tag) {
          return 1;
        } else {
          return 0;
        }
      });
      setTasks(updatedTasks);
      setSortedByTag(!sortedByTag);
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    } else if (sortedByTag) {
      sortByTimestamp();
      setSortedByTag(false);
    }
  };

  // const sortByTaskHandler = () => {
  //   setSortedByDone(false);
  //   setSortedByTag(false);
  //   setSortedByDate(false);
  //   if (!sortedByTask) {
  //     const updatedTasks = [...tasks].sort((a, b) => {
  //       if (a.text < b.text) {
  //         return -1;
  //       } else if (a.text > b.text) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     setTasks(updatedTasks);
  //     setSortedByTask(!sortedByTask);
  //     localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
  //   } else if (sortedByTask) {
  //     sortByTimestamp();
  //     setSortedByTask(false);
  //   }
  // };

  return (
    <div className="app">
      <Header toggleSideBar={toggleSideBar} sideBarIsShown={sideBarIsShown} />
      {/* {sideBarIsShown && <SideBar TASKS={DUMMY_TASKS} LISTS={DUMMY_LISTS} />} */}
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        tagInputChangeHandler={tagInputChangeHandler}
        addNewTaskHandler={addNewTaskHandler}
        addNewTaskOnEnterHandler={addNewTaskOnEnterHandler}
        showCalendarHandler={showCalendarHandler}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
        enteredTask={enteredTask}
        enteredTag={enteredTag}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={tasks}
        tags={tags}
        sortByTaskHandler={sortByTaskHandler}
        sortedByTask={sortedByTask}
        sortByTagHandler={sortByTagHandler}
        sortedByTag={sortedByTag}
        sortByDateHandler={sortByDateHandler}
        sortedByDate={sortedByDate}
        sortedByDone={sortedByDone}
        sortByDoneHandler={sortByDoneHandler}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        TEXT_SORT={TEXT_SORT}
        ASC_SORT={ASC_SORT}
        DESC_SORT={DESC_SORT}
      />
    </div>
  );
}

export default App;
