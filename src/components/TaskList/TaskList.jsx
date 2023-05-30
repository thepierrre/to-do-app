import { PropaneSharp } from "@mui/icons-material";
import NewTask from "../NewTask/NewTask";
import SingleTask from "./SingleTask";
import "./TaskList.css";

const TaskList = (props) => {
  const { tasks, removeTaskHandler, tags, markTaskAsDoneHandler, tagColor } =
    props;

  const tasksList = tasks.map((task) => (
    <SingleTask
      key={task.id}
      text={task.text}
      date={task.date}
      tag={task.tag}
      isDone={task.isDone}
      tags={tags}
      tagColor={tagColor}
      removeTaskHandler={() => removeTaskHandler(task.id)}
      markTaskAsDoneHandler={() => markTaskAsDoneHandler(task.id)}
    />
  ));

  return (
    <>
      <div className="task-list">
        {tasks.length === 0 && <p>Your tasks will appear here.</p>}
        {tasks.length !== 0 && (
          <div className="column-titles">
            <p className="bar-label label-done">Done</p>
            <p className="bar-label label-text">Task</p>
            <p className="bar-label label-date">Due date</p>
            <p className="bar-label label-tag">Tag</p>
            <p className="bar-label label-remove">Bin</p>
          </div>
        )}
        {tasksList}
      </div>
    </>
  );
};

export default TaskList;
