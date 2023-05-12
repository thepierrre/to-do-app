import "./SingleTask.css";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const tasksList = props.tasksList;

const SingleTask = (props) => {
  const taskTextClassName = `task-bar--item text ${props.isDone ? "done" : ""}`;


  return (
    <div className="task-bar">
      <IconButton
        onClick={props.markTaskAsDoneHandler}
        className="task-bar--item button tick"
      >
        <CheckCircleOutlineIcon />
      </IconButton>
      <div className={taskTextClassName}>{props.text}</div>
      <div className="task-bar--item due-date">{props.date}</div>
      <div className="task-bar--item category">
        <div>{props.category}</div>
      </div>
      <IconButton
        onClick={props.removeTaskHandler}
        className="task-bar--item button remove"
      >
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  );
};

export default SingleTask;
