import "./SingleTask.css";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const tasksList = props.tasksList;

const SingleTask = (props) => {
  const {
    isDone,
    task,
    text,
    date,
    category,
    removeTaskHandler,
    markTaskAsDoneHandler,
  } = props;

  const taskTextClassName = `task-bar--item text ${props.isDone ? "done" : ""}`;
  const taskDateClassName = `${
    date === "no date"
      ? "task-bar--item due-date no-date"
      : "task-bar--item due-date"
  }`;

  const taskTagInnerClassName = `${
    category === "" || category === "no tag" ? "tag-inner empty" : "tag-inner"
  }`;

  return (
    <div className="task-bar">
      <div className="task-bar--item button tick">
        <IconButton onClick={markTaskAsDoneHandler}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
      <div contentEditable="true" suppressContentEditableWarning={true} className={taskTextClassName}>{text}</div>
      <div className={taskDateClassName}>{date}</div>
      <div className="task-bar--item tag">
        <div className={taskTagInnerClassName}>{category}</div>
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
