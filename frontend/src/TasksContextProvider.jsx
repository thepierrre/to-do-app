import axios from "axios";
import { useState, useEffect } from "react";
import TasksContext from "./context/tasks-context";

const TasksContextProvider = (props) => {
  const { children } = props; //
  const [tasks, setTasks] = useState([]);
  const [enteredTask, setEnteredTask] = useState("");
  const [enteredTag, setEnteredTag] = useState("");
  const [enteredTaskIsValid, setEnteredTaskIsValid] = useState(false);
  const [enteredTaskIsTouched, setEnteredTaskIsTouched] = useState(false);
  const [listName, setListName] = useState("");
  const [calendarIsShown, setCalendarIsShown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(undefined);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "https://mytodolists-62a4af294d6a.herokuapp.com/api/lists"
        );
        setLists(response.data.lists);
      } catch (err) {}
    };
    fetchLists();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        enteredTask,
        setEnteredTask,
        enteredTag,
        setEnteredTag,
        enteredTaskIsValid,
        setEnteredTaskIsValid,
        enteredTaskIsTouched,
        setEnteredTaskIsTouched,
        listName,
        setListName,
        calendarIsShown,
        setCalendarIsShown,
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
