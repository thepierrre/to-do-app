import "./SingleTask.css";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Menu } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

const SingleTask = (props) => {
  const {
    removeTaskHandler,
    markTaskAsDoneHandler,
    editTaskTextHandler,
    editTaskDateHandler,
    editTaskTagHandler,
    task,
  } = props;

  const { text, date, tag, isDone } = task;
  const tagColor = tag?.color;
  const tagText = tag?.text;

  const taskTextClassName = `task-bar--item text ${isDone ? "done-task" : ""}`;

  const taskDateClassName = `task-bar--item date ${date ? "" : "no-date"}`;

  const taskTagInnerClassName = `tag-inner ${
    tagText === "" || tagText === "no tag" ? "empty" : ""
  }`;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="task-bar-container">
      <div className="task-bar">
        <div className="task-bar--item done">
          <IconButton onClick={markTaskAsDoneHandler}>
            <CheckCircleOutlineIcon />
          </IconButton>
        </div>
        <input
          onChange={(event) => editTaskTextHandler(event.target.value)}
          className={taskTextClassName}
          value={text}
        ></input>
        <div>
          <button className={taskDateClassName} onClick={handleClick}>
            {date && new Date(date) < new Date() && (
              <PriorityHighIcon fontSize="small" color="error" />
            )}
            <span>
              {date
                ? date.toLocaleDateString("en-UK", {
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
                editTaskDateHandler(selectedDate);
                handleClose();
              }}
            />
          </Menu>
        </div>
        <div className="task-bar--item tag">
          <input
            className={taskTagInnerClassName}
            onChange={(event) => editTaskTagHandler(event.target.value)}
            style={{
              backgroundColor: tagColor ?? "transparent",
              // color: task.tag.text ?? "black",
            }}
            value={tagText}
            placeholder="no tag"
          />
        </div>
        <div className="task-bar--item button remove">
          <IconButton onClick={removeTaskHandler}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
