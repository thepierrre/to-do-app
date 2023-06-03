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
    tags,
    editTaskTextHandler,
    editTaskDateHandler,
    editTaskTagHandler,
    task,
  } = props;

  const { text, date, tag } = task;

  const taskTextClassName = `task-bar--item text ${
    props.isDone ? "done-task" : ""
  }`;

  const taskDateClassName = `task-bar--item date ${
    date === "no date" ? "no-date" : ""
  }`;

  const taskTagInnerClassName = `tag-inner ${
    tag === "" || tag === "no tag" ? "empty" : ""
  }`;

  const color = tags[tag]?.color;

  const [anchorEl, setAnchorEl] = useState(null);

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
          {new Date(date) < new Date() && (
            <PriorityHighIcon fontSize="small" color="error" />
          )}
          <span>{date}</span>
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
        {/* <div
          className={taskTagInnerClassName}
          contentEditable="true"
          suppressContentEditableWarning={true}
          style={{ backgroundColor: color }}
        >
          {tag}
        </div> */}
        <input
          className={taskTagInnerClassName}
          onChange={(event) => editTaskTagHandler(event.target.value)}
          style={{ backgroundColor: color }}
          value={tag}
        />
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

//   return (
//     <div className="task-bar">
//       <div className="task-bar--item button tick">
//         <IconButton onClick={markTaskAsDoneHandler}>
//           <CheckCircleOutlineIcon />
//         </IconButton>
//       </div>
//       <input
//         onChange={(event) => editTaskTextHandler(event.target.innerText)}
//         className={taskTextClassName}
//         value={text}
//       >
//         {/* {text} */}
//       </input>
//       <div className={taskDateClassName}>
//         {new Date(date) < new Date() && (
//           <PriorityHighIcon fontSize="small" color="error" />
//         )}
//         <span>{date}</span>
//       </div>
//       <div className="task-bar--item tag">
//         <div
//           className={taskTagInnerClassName}
//           contentEditable="true"
//           suppressContentEditableWarning={true}
//           style={{ backgroundColor: color }}
//         >
//           {tag}
//         </div>
//       </div>
//       <div className="task-bar--item button remove">
//         <IconButton onClick={removeTaskHandler}>
//           <DeleteOutlineIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default SingleTask;
