import { PropaneSharp } from "@mui/icons-material";
import NewTask from "../NewTask/NewTask";
import SingleTask from "./SingleTask";
import "./TaskList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import IconButton from "@mui/material/IconButton";
import {
  ASC_SORT,
  DESC_SORT,
  DONE_SORT,
  DATE_SORT,
  TEXT_SORT,
  TAG_SORT,
} from "../../helpers/sortingFunctions";

const TaskList = (props) => {
  const {
    tasks,
    removeTaskHandler,
    tags,
    markTaskAsDoneHandler,
    sortByTaskHandler,
    sortByTagHandler,
    sortByDateHandler,
    sortByDoneHandler,
    sortedByTag,
    sortedByDate,
    sortedBy,
    setTasks,
    editTaskTextHandler,
    editTaskDateHandler,
    editTaskTagHandler,
    taskInputChangeHandler,
    editedTask,
  } = props;

  const tasksList = tasks.map((task) => (
    <SingleTask
      key={task.id}
      task={task}
      editedTask={editedTask}
      taskInputChangeHandler={taskInputChangeHandler}
      tags={tags}
      setTasks={setTasks}
      editTaskTagHandler={(enteredTag) =>
        editTaskTagHandler(task.id, enteredTag)
      }
      editTaskTextHandler={(enteredText) =>
        editTaskTextHandler(task.id, enteredText)
      }
      editTaskDateHandler={(enteredDate) =>
        editTaskDateHandler(task.id, enteredDate)
      }
      removeTaskHandler={() => removeTaskHandler(task.id)}
      markTaskAsDoneHandler={() => markTaskAsDoneHandler(task.id)}
    />
  ));

  const labelDoneInternalClass = `${
    sortedBy.feature === DONE_SORT ? "sort" : ""
  }`;

  const labelTextInternalClass = `${
    sortedBy.feature === TEXT_SORT ? "sort" : ""
  }`;

  const labelDateInternalClass = `${
    sortedBy.feature === DATE_SORT ? "sort" : ""
  }`;

  const labelTagInternalClass = `${
    sortedBy.feature === TAG_SORT ? "sort" : ""
  }`;

  return (
    <div>
      <div className="tasks-list">
        {tasks.length === 0 && <p>Your tasks will appear here.</p>}
        {tasks.length !== 0 && (
          <div className="labels">
            <span className="label label-done">
              <p className={labelDoneInternalClass}>Done</p>
              <IconButton className="filter-button" onClick={sortByDoneHandler}>
                {sortedBy.feature !== DONE_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === DONE_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="primary" />
                  )}
                {sortedBy.feature === DONE_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="primary" />
                  )}
              </IconButton>
            </span>

            <span className="label label-text">
              <p className={labelTextInternalClass}>Task</p>
              <IconButton className="filter-button" onClick={sortByTaskHandler}>
                {sortedBy.feature !== TEXT_SORT && <UnfoldMoreIcon />}
                {sortedBy.feature === TEXT_SORT &&
                  sortedBy.direction === ASC_SORT && (
                    <KeyboardArrowUpIcon color="primary" />
                  )}
                {sortedBy.feature === TEXT_SORT &&
                  sortedBy.direction === DESC_SORT && (
                    <KeyboardArrowDownIcon color="primary" />
                  )}
              </IconButton>
            </span>

            <span className="label label-date">
              <p className={labelDateInternalClass}>Due date</p>
              <IconButton className="filter-button" onClick={sortByDateHandler}>
                {!sortedByDate && <UnfoldMoreIcon />}
                {sortedByDate && <ArrowDropUpIcon color="primary" />}
              </IconButton>
            </span>

            <span className="label label-tag">
              <p className={labelTagInternalClass}>Tag</p>
              <IconButton className="filter-button" onClick={sortByTagHandler}>
                {!sortedByTag && <UnfoldMoreIcon />}
                {sortedByTag && <ArrowDropUpIcon color="primary" />}
              </IconButton>
            </span>
            <span className="label label-remove">
              <p>Bin</p>
            </span>
          </div>
        )}
        {tasksList}
      </div>
    </div>
  );
};

export default TaskList;
