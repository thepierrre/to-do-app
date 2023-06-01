// import { tasks, sortedBy } from "../App.jsx";
import { useState } from "react";

export const [tasks, setTasks] = useState([]);

const useSortedState = () => {
  const [sortedBy, setSortedBy] = useState({
    feature: undefined,
    direction: undefined,
  });
  return [sortedBy, setSortedBy];
};

export const DONE_SORT = "DONE";
export const TEXT_SORT = "TEXT";
export const TAG_SORT = "TAG";
export const DATE_SORT = "DATE";
export const DESC_SORT = "DESC";
export const ASC_SORT = "ASC";

export const sortByTimestamp = () => {
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

export const getTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(storedTasks);
};

export const getSortedTasks = (tasks, feature) => {
  const [sortedByState, setSortedByState] = useSortedState();
  const storedTasks = getTasks();

  if (feature === TEXT_SORT) {
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
  }
};
