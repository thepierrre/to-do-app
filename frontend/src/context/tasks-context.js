import { createContext } from "react";

const TasksContext = createContext({
  tasks: [],
  setTasks: () => {},
  enteredTask: "",
  setEnteredTask: () => {},
  enteredTag: "",
  setEnteredTag: () => {},
  enteredTaskIsValid: false,
  setEnteredTaskIsValid: () => {},
  enteredTaskIsTouched: false,
  setEnteredTaskIsTouched: false,
  listName: "",
  setListName: () => {},
  calendarIsShown: false,
  setCalendarIsShown: () => {},
  selectedDay: undefined,
  setSelectedDay: () => {},
});

export default TasksContext;
