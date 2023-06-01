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
    sortedByTask,
    sortedByTag,
    sortedByDone,
    sortedByDate,
    sortedBy,
    setSortedBy,
    TEXT_SORT,
    ASC_SORT,
    DESC_SORT,
  } = props;

  const tasksList = tasks.map((task) => (
    <SingleTask
      key={task.id}
      text={task.text}
      date={task.date}
      tag={task.tag}
      isDone={task.isDone}
      tags={tags}
      removeTaskHandler={() => removeTaskHandler(task.id)}
      markTaskAsDoneHandler={() => markTaskAsDoneHandler(task.id)}
    />
  ));
  // setSortedBy({ feature: DATE_SORT, direction: ASC_SORT });
  // !sortedBy.feature && !sortedBy.direction;

  const labelInternalClass = `${
    sortedBy.feature && sortedBy.direction ? "sort" : ""
  }`;

  return (
    <>
      <div className="task-list">
        {tasks.length === 0 && <p>Your tasks will appear here.</p>}
        {tasks.length !== 0 && (
          <div className="column-titles">
            <span className="bar-label label-done">
              <p>Done</p>
              <IconButton className="filter-button" onClick={sortByDoneHandler}>
                {!sortedByDone && <UnfoldMoreIcon />}
                {sortedByDone && <ArrowDropUpIcon color="primary" />}
              </IconButton>
            </span>
            <span className="bar-label label-text">
              <p className={labelInternalClass}>Task</p>
              <IconButton className="filter-button" onClick={sortByTaskHandler}>
                {!sortedBy.feature && !sortedBy.direction && <UnfoldMoreIcon />}
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
            <span className="bar-label label-date">
              <p>Due date</p>
              <IconButton className="filter-button" onClick={sortByDateHandler}>
                {!sortedByDate && <UnfoldMoreIcon />}
                {sortedByDate && <ArrowDropUpIcon color="primary" />}
              </IconButton>
            </span>
            <span className="bar-label label-tag">
              <p>Tag</p>
              <IconButton className="filter-button" onClick={sortByTagHandler}>
                {!sortedByTag && <UnfoldMoreIcon />}
                {sortedByTag && <ArrowDropUpIcon color="primary" />}
              </IconButton>
            </span>
            <span className="bar-label label-remove">
              <p>Bin</p>
            </span>
          </div>
        )}
        {tasksList}
      </div>
    </>
  );
};

export default TaskList;
