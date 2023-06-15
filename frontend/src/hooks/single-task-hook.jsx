import axios from "axios";
import _ from "lodash";
import { useCallback, useContext } from "react";
import TasksContext from "../context/tasks-context";

const useTask = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  const debouncedTextHandle = useCallback(
    _.debounce((taskId, newTextValue) => {
      editTaskTextHandler(taskId, newTextValue);
    }, 300),
    []
  );

  const debouncedTagHandle = useCallback(
    _.debounce((taskId, newTagValue) => {
      editTaskTagHandler(taskId, newTagValue);
    }, 300),
    []
  );

  const markTaskAsDoneHandler = async (taskId) => {
    try {
      const response = await axios.patch(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/tasks/${taskId}`,
        {
          isDone: !tasks.find((task) => task._id === taskId).isDone,
        }
      );

      if (response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, isDone: response.data.task.isDone }
              : task
          )
        );
      } else {
        console.log("Missing data in the response.");
      }
    } catch (err) {
      console.log("Error while editing the task:", err);
    }
  };

  const editTaskTextHandler = async (taskId, enteredTask) => {
    try {
      const response = await axios.patch(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/tasks/${taskId}`,
        {
          text: enteredTask,
        }
      );

      if (response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, text: response.data.task.text }
              : task
          )
        );
      } else {
        console.log("Missing data in the response.");
      }
    } catch (err) {
      console.log("Error while editing a task:", err);
    }
  };

  const editTaskTagHandler = async (taskId, enteredTag) => {
    try {
      const response = await axios.patch(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/tasks/${taskId}`,
        {
          tag: enteredTag,
        }
      );

      if (response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, tag: response.data.task.tag }
              : task
          )
        );
      } else {
        console.log("Missing data in the response.");
      }
    } catch (err) {
      console.log("Error while editing the task:", err);
    }
  };

  const editTaskDateHandler = async (taskId, enteredDate) => {
    try {
      const response = await axios.patch(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/tasks/${taskId}`,
        { date: enteredDate }
      );

      if (response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, date: response.data.task.date }
              : task
          )
        );
      } else {
        console.log("Missing data in the response.");
      }
    } catch (err) {
      console.log("Error while editing the task:", err);
    }
  };

  const removeTaskHandler = async (taskId) => {
    try {
      await axios.delete(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/tasks/${taskId}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {}
  };

  return {
    debouncedTextHandle,
    debouncedTagHandle,
    editTaskTextHandler,
    editTaskTagHandler,
    editTaskDateHandler,
    markTaskAsDoneHandler,
    removeTaskHandler,
  };
};

export default useTask;
