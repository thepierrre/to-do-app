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
} from "./utils/sortingFunctions.js";
import { DUMMY_TASKS } from "./utils/dummyTasks";
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
  const [sortedTasks, setSortedTasks] = useState([]);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [enteredMenuInputTag, setEnteredMenuInputTag] = useState("");
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");
  const [sortedBy, setSortedBy] = useState(DEFAULT_SORT);
  const [tags, setTags] = useState(["Household", "Running"]);

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

  const tagInputChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const menuTagInputChangeHandler = (event) => {
    event.stopPropagation();
    setEnteredMenuInputTag(event.target.value);
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
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const editTaskDateHandler = (taskId, enteredDate) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            date: enteredDate,
          };
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const editTaskTagHandler = (taskId, enteredTag) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, tag: enteredTag };
        } else {
          return task;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

  const addNewTagHandler = (event) => {
    event.preventDefault();
    if (enteredTag) {
      if (!tags.includes(enteredTag)) {
        setTags((prevTags) => [enteredTag, ...prevTags]);
      }
    }
  };

  const addNewTagFromMenuHandler = (event) => {
    event.preventDefault();
    if (enteredMenuInputTag) {
      if (!tags.includes(enteredMenuInputTag)) {
        setTags((prevTags) => [enteredMenuInputTag, ...prevTags]);
      }
    }
    setEnteredMenuInputTag("");
  };

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const newTask = {
        id: uuidv4(),
        text: enteredTask,
        date: selectedDay,
        tag: enteredTag,
        timestamp: new Date(),
        isDone: false,
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setEnteredTask("");
      setEnteredTag("");

      const updatedTasks = [newTask, ...tasks];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const addNewTaskOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      addNewTaskHandler(event);
      addNewTagHandler(event);
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
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const removeTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(storedTasks);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        tagInputChangeHandler={tagInputChangeHandler}
        addNewTaskOnEnterHandler={addNewTaskOnEnterHandler}
        addNewTaskHandler={addNewTaskHandler}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
        enteredTask={enteredTask}
        enteredTag={enteredTag}
        setEnteredTag={setEnteredTag}
        tags={tags}
        setTags={setTags}
        addNewTagHandler={addNewTagHandler}
        menuTagInputChangeHandler={menuTagInputChangeHandler}
        enteredMenuInputTag={enteredMenuInputTag}
        setEnteredMenuInputTag={setEnteredMenuInputTag}
        addNewTagFromMenuHandler={addNewTagFromMenuHandler}
      />
      {calendarIsShown && <Calendar />}
      <TaskList
        markTaskAsDoneHandler={markTaskAsDoneHandler}
        removeTaskHandler={removeTaskHandler}
        tasks={sortedTasks}
        sortByTaskHandler={sortByTaskHandler}
        sortByTagHandler={sortByTagHandler}
        sortByDateHandler={sortByDateHandler}
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
