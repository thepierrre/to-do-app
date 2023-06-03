import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { v4 as uuidv4 } from "uuid";

import {
  TEXT_SORT,
  DATE_SORT,
  DONE_SORT,
  TAG_SORT,
  DESC_SORT,
  ASC_SORT,
  getSortedTasks,
  DEFAULT_SORT,
} from "./helpers/sortingFunctions.js";

import Header from "./components/Layout/Header";
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TaskList/TaskList";
import Calendar from "./components/TaskList/Calendar";
import "./App.css";

const date = DateTime.local(2023, 6, 10);

export const formattedDate = date.toLocaleString({
  month: "short",
  day: "numeric",
  year: "numeric",
});

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [sideBarIsShown, setSideBarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");
  const [tagColor, setTagColor] = useState(undefined);
  const [tags, setTags] = useState({});
  const [sortedByDone, setSortedByDone] = useState(false);
  const [sortedByTask, setSortedByTask] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedByTag, setSortedByTag] = useState(false);

  const [sortedBy, setSortedBy] = useState(DEFAULT_SORT);

  useEffect(() => {
    setSortedTasks(getSortedTasks(tasks, sortedBy));
  }, [tasks, sortedBy]);

  const sortByDoneHandler = () => {
    if (sortedBy.feature === DONE_SORT) {
      if (sortedBy.direction === ASC_SORT) {
        setSortedBy({ feature: DONE_SORT, direction: DESC_SORT });
      } else {
        setSortedBy(DEFAULT_SORT);
      }
    } else {
      setSortedBy({ feature: DONE_SORT, direction: ASC_SORT });
    }
  };

  const sortByTaskHandler = () => {
    if (sortedBy.feature === TEXT_SORT) {
      if (sortedBy.direction === ASC_SORT) {
        setSortedBy({ feature: TEXT_SORT, direction: DESC_SORT });
      } else {
        setSortedBy(DEFAULT_SORT);
      }
    } else {
      setSortedBy({ feature: TEXT_SORT, direction: ASC_SORT });
    }
  };

  const sortByDateHandler = () => {
    if (sortedBy.feature === DATE_SORT) {
      if (sortedBy.direction === ASC_SORT) {
        setSortedBy({ feature: DATE_SORT, direction: DESC_SORT });
      } else {
        setSortedBy(DEFAULT_SORT);
      }
    } else {
      setSortedBy({ feature: DATE_SORT, direction: ASC_SORT });
    }
  };

  const sortByTagHandler = () => {
    if (sortedBy.feature === TAG_SORT) {
      if (sortedBy.direction === ASC_SORT) {
        setSortedBy({ feature: TAG_SORT, direction: DESC_SORT });
      } else {
        setSortedBy(DEFAULT_SORT);
      }
    } else {
      setSortedBy({ feature: TAG_SORT, direction: ASC_SORT });
    }
  };

  const handleDayClick = (day, { selectedDay }) => {
    setSelectedDay(selectedDay ? undefined : day);
  };

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const getRandomColor = () => {
    return (
      "hsl(" +
      360 * Math.random() +
      "," +
      (25 + 70 * Math.random()) +
      "%," +
      (85 + 10 * Math.random()) +
      "%)"
    );
  };

  const editTaskTextHandler = (taskId, enteredText) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: enteredText };
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
      return updatedTasks;
    });
  };

  const editTaskDateHandler = (taskId, enteredDate) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            date: enteredDate
              ? enteredDate.toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "no date",
          };
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
      return updatedTasks;
    });
  };

  // const editTaskTagHandler = (taskId, enteredTag) => {
  //   const color = getRandomColor();
  //   setTasks((prevTasks) => {
  //     const updatedTasks = prevTasks.map((task) => {
  //       if (task.id === taskId) {
  //         return { ...task, tag: enteredTag };
  //       } else {
  //         return task;
  //       }
  //     });
  //     localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
  //     return updatedTasks;
  //   });
  // };

  const editTaskTagHandler = (taskId, enteredTag) => {
    const color = getRandomColor();
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          if (enteredTag && !tags[enteredTag]) {
            const newTags = { ...tags, [enteredTag]: { color } };
            setTags(newTags);
            localStorage.setItem("tags", JSON.stringify(newTags));
            setTagColor(color);
            return { ...task, tag: enteredTag };
          }
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
      return updatedTasks;
    });
  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

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
        const newTags = { ...tags, [enteredTag]: { color } };
        setTags(newTags);
        localStorage.setItem("tags", JSON.stringify(newTags));
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
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
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
    const storedTags = localStorage.getItem("tags", JSON.stringify(tags));
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }
  }, []);

  return (
    <div className="app">
      <Header toggleSideBar={toggleSideBar} sideBarIsShown={sideBarIsShown} />
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        addNewTaskOnEnterHandler={addNewTaskOnEnterHandler}
        addNewTaskHandler={addNewTaskHandler}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
        enteredTask={enteredTask}
        enteredTag={enteredTag}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={sortedTasks}
        tags={tags}
        sortByTaskHandler={sortByTaskHandler}
        sortByTagHandler={sortByTagHandler}
        sortedByTag={sortedByTag}
        sortByDateHandler={sortByDateHandler}
        sortedByDate={sortedByDate}
        sortByDoneHandler={sortByDoneHandler}
        sortedBy={sortedBy}
        setTasks={setTasks}
        editTaskTextHandler={editTaskTextHandler}
        editTaskDateHandler={editTaskDateHandler}
        editTaskTagHandler={editTaskTagHandler}
      />
    </div>
  );
}

export default App;
