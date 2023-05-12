import { PropaneSharp } from "@mui/icons-material";
import NewTask from "../NewTask/NewTask";
import SingleTask from "./SingleTask";


const TaskList = ( props ) => {
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

  return <div className="task-list">{tasksList}</div>;
};

export default TaskList;
