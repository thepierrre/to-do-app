import _ from "lodash";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Menu } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import useTask from "../../hooks/single-task-hook";
import "./SingleTask.css";

const SingleTask = (props) => {
  const {
    debouncedTextHandle,
    debouncedTagHandle,
    editTaskDateHandler,
    markTaskAsDoneHandler,
    removeTaskHandler,
  } = useTask();
  const { task } = props;

  const { text, date, tag, isDone } = task;
  const [taskText, setTaskText] = useState(text);
  const [taskTag, setTaskTag] = useState(tag);
  const [anchorEl, setAnchorEl] = useState(null);

  const taskTextClassName = `task-bar--item text ${isDone ? "done-task" : ""}`;
  const taskDateClassName = `task-bar--item date ${date ? "" : "no-date"}`;
  const taskTagClassName = `tag ${tag ? "" : "tag-empty"}`;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="task-bar">
      <div className="task-bar--item done">
        <IconButton onClick={() => markTaskAsDoneHandler(task._id)}>
          <CheckCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
      <input
        onChange={(event) => {
          setTaskText(event.target.value);
          debouncedTextHandle(task._id, event.target.value);
        }}
        className={taskTextClassName}
        value={taskText}
      />
      <div className="date-container">
        <button className={taskDateClassName} onClick={handleClick}>
          {date && new Date(date) < new Date() && (
            <PriorityHighIcon fontSize="small" color="error" />
          )}
          <span>
            {date
              ? new Date(date).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "no date"}
          </span>
        </button>
        <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <DayPicker
            mode="single"
            selected={new Date(date)}
            onSelect={(selectedDate) => {
              editTaskDateHandler(task._id, selectedDate);
              handleClose();
            }}
          />
        </Menu>
      </div>
      <input
        className={taskTagClassName}
        onChange={(event) => {
          setTaskTag(event.target.value);
          debouncedTagHandle(task._id, event.target.value);
        }}
        value={taskTag || ""}
        placeholder="no tag"
      />
      <div className="task-bar--item button remove">
        <IconButton onClick={() => removeTaskHandler(task._id)} color="primary">
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleTask;
