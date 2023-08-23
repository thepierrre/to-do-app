import { useContext, useEffect, useState } from "react";
import {
  TEXT_SORT,
  DATE_SORT,
  DONE_SORT,
  TAG_SORT,
  DESC_SORT,
  ASC_SORT,
  getSortedTasks,
  DEFAULT_SORT,
} from "../../utils/sortingFunctions";
import SingleTask from "./SingleTask";
import TasksFilter from "./TasksFilter";
import "./TaskList.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import IconButton from "@mui/material/IconButton";
import TasksContext from "../../context/tasks-context";

const TaskList = () => {
  const { tasks } = useContext(TasksContext);
  const [sortedBy, setSortedBy] = useState(DEFAULT_SORT);
  const [sortedTasks, setSortedTasks] = useState([]);

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

  const tasksList = sortedTasks.map((task) => (
    <SingleTask key={task._id} task={task} />
  ));

  return (
    <div className="tasks-list">
      {sortedTasks.length === 0 && (
        <p className="tasks-list-empty">Your tasks will appear here.</p>
      )}
      {sortedTasks.length !== 0 && (
        <>
          <TasksFilter sortedBy={sortedBy} setSortedBy={setSortedBy} />
          <div className="labels">
            <span className="label label-done">
              <IconButton className="filter-button" onClick={sortByDoneHandler}>
                {sortedBy.feature !== DONE_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === DONE_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="light" />
                  )}
                {sortedBy.feature === DONE_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="light" />
                  )}
              </IconButton>
            </span>

            <span className="label label-text">
              <IconButton className="filter-button" onClick={sortByTaskHandler}>
                {sortedBy.feature !== TEXT_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === TEXT_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="light" />
                  )}
                {sortedBy.feature === TEXT_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="light" />
                  )}
              </IconButton>
            </span>

            <span className="label label-date">
              <IconButton className="filter-button" onClick={sortByDateHandler}>
                {sortedBy.feature !== DATE_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === DATE_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="light" />
                  )}
                {sortedBy.feature === DATE_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="light" />
                  )}
              </IconButton>
            </span>

            <span className="label label-tag">
              <IconButton className="filter-button" onClick={sortByTagHandler}>
                {sortedBy.feature !== TAG_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === TAG_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="light" />
                  )}
                {sortedBy.feature === TAG_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="light" />
                  )}
              </IconButton>
            </span>
            <span className="label label-remove"></span>
          </div>
        </>
      )}
      {tasksList}
    </div>
  );
};

export default TaskList;
