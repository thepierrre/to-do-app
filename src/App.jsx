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
import { getRandomColor } from "./utils/visualFunctions.js";

const date = DateTime.local(2023, 6, 10);

export const formattedDate = date.toLocaleString({
  month: "short",
  day: "numeric",
  year: "numeric",
});

function App() {
  const [enteredTask, setEnteredTask] = useState("");
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [sideBarIsShown, setSideBarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [enteredTag, setEnteredTag] = useState("");
  const [tagColor, setTagColor] = useState(undefined);
  const [tags, setTags] = useState({});
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

  const tagInputChangeHandler = (event) => {
    setEnteredTag(event.target.value);
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
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...updatedTasks.map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          })),
        ])
      );
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
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...updatedTasks.map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          })),
        ])
      );
      return updatedTasks;
    });
  };

  const editTaskTagHandler = (taskId, enteredTag) => {
    const color =
      Object.values(tags).find((tag) => tag.text === enteredTag)?.color ??
      getRandomColor();
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          if (enteredTag) {
            let tagId;
            if (task.tag) {
              tagId = task.tag.id;
            } else {
              tagId = uuidv4();
            }
            const newTagValue = { id: tagId, color, text: enteredTag };
            const newTags = { ...tags, [tagId]: newTagValue };
            setTags(newTags);
            localStorage.setItem("tags", JSON.stringify(newTags));
            setTagColor(color);
            return { ...task, tag: newTagValue };
          }
        }
        return task;
      });
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...updatedTasks.map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          })),
        ])
      );
      return updatedTasks;
    });
  };

  const enteredTaskIsValid = enteredTask.trim().length !== 0;

  const addNewTaskHandler = (event) => {
    event.preventDefault();
    if (enteredTaskIsValid) {
      const color =
        Object.values(tags).find((tag) => tag.text === enteredTag)?.color ??
        getRandomColor();
      const newTag = enteredTag
        ? {
            id: uuidv4(),
            text: enteredTag,
            color,
          }
        : null;
      const newTask = {
        id: uuidv4(),
        text: enteredTask,
        date: selectedDay,
        tag: newTag,
        timestamp: new Date(),
        isDone: false,
      };

      if (enteredTag && !tags[enteredTag]) {
        const newTags = { ...tags, [enteredTag]: newTag };
        setTags(newTags);
        localStorage.setItem("tags", JSON.stringify(newTags));
      }
      setTagColor(color);

      setTasks((prevTasks) => [newTask, ...prevTasks]);

      localStorage.setItem(
        "tasks",
        JSON.stringify(
          [newTask, ...tasks].map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          }))
        )
      );

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
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...updatedTasks.map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          })),
        ])
      );
      return updatedTasks;
    });
  };

  const removeTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...updatedTasks.map((task) => ({
            ...task,
            tag: JSON.stringify(task.tag),
          })),
        ])
      );
      return updatedTasks;
    });
  };

  const toggleSideBar = () => {
    setSideBarIsShown(!sideBarIsShown);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(
        JSON.parse(storedTasks).map((task) => {
          return {
            ...task,
            date: task.date ? new Date(task.date) : null,
            tag: task.tag ? JSON.parse(task.tag) : null,
          };
        })
      );
    }
    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }
  }, []);

  return (
    <div className="app">
      <Header toggleSideBar={toggleSideBar} sideBarIsShown={sideBarIsShown} />
      <NewTask
        taskInputChangeHandler={taskInputChangeHandler}
        tagInputChangeHandler={tagInputChangeHandler}
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
