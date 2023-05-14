import { PropaneSharp } from "@mui/icons-material";
import NewTask from "../NewTask/NewTask";
import SingleTask from "./SingleTask";
import "./TaskList.css";

const TaskList = (props) => {
  const tasksList = props.tasks.map((task) => (
    <SingleTask
      key={task.id}
      text={task.text}
      date={task.date}
      category={task.category}
      isDone={task.isDone}
      removeTaskHandler={() => props.removeTaskHandler(task.id)}
      markTaskAsDoneHandler={() => props.markTaskAsDoneHandler(task.id)}
    />
  ));

  return (
    <>
      <div className="task-list">
        <div className="column-titles">
          <p className="bar-label label-done">Done</p>
          <p className="bar-label label-text">Task</p>
          <p className="bar-label label-date">Due date</p>
          <p className="bar-label label-tag">Tag</p>
          <p className="bar-label label-remove">Bin</p>
        </div>
        {tasksList}
      </div>
    </>
  );
};

export default TaskList;
