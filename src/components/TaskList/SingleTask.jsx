import "./SingleTask.css";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const SingleTask = (props) => {
  const {
    text,
    date,
    tag,
    removeTaskHandler,
    markTaskAsDoneHandler,
    tags,
    tasks,
  } = props;

  const taskTextClassName = `task-bar--item text ${props.isDone ? "done" : ""}`;

  const taskDateClassName = `task-bar--item due-date ${
    date === "no date" ? "no-date" : ""
  }`;

  const taskTagInnerClassName = `tag-inner ${
    tag === "" || tag === "no tag" ? "empty" : ""
  }`;

  const color = tags[tag]?.color;

  return (
    <div className="task-bar">
      <div className="task-bar--item button tick">
        <IconButton onClick={markTaskAsDoneHandler}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        className={taskTextClassName}
      >
        {text}
      </div>
      <div className={taskDateClassName}>
        {new Date(date) < new Date() && (
          <PriorityHighIcon fontSize="small" color="error" />
        )}
        <span>{date}</span>
      </div>
      <div className="task-bar--item tag">
        <div
          className={taskTagInnerClassName}
          contentEditable="true"
          suppressContentEditableWarning={true}
          style={{ backgroundColor: color }}
        >
          {tag}
        </div>
      </div>
      <div className="task-bar--item button remove">
        <IconButton onClick={removeTaskHandler}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleTask;
