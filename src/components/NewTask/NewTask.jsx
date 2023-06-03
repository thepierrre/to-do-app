import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./NewTask.css";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import CalendarMenu from "./CalendarMenu";

const NewTask = (props) => {
  const {
    taskInputChangeHandler,
    tagInputChangeHandler,
    addNewTaskOnEnterHandler,
    enteredTask,
    enteredTag,
    handleDayClick,
    selectedDay,
    addNewTaskHandler,
  } = props;

  return (
    <form className="new-task">
      <FormControl>
        <Input
          onChange={taskInputChangeHandler}
          onKeyDown={addNewTaskOnEnterHandler}
          className="new-task--input"
          placeholder="New task"
          inputProps={{ maxLength: 50 }}
          id="outlined-adornment-task"
          value={enteredTask}
          maxLength="50"
          startAdornment={
            <InputAdornment position="start">
              <CalendarMenu
                handleDayClick={handleDayClick}
                selectedDay={selectedDay}
              />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl>
        <Input
          onChange={tagInputChangeHandler}
          onKeyDown={addNewTaskOnEnterHandler}
          value={enteredTag}
          inputProps={{ maxLength: 15 }}
          className="new-task-tag--input"
          placeholder="Tag (optional)"
        />
      </FormControl>
      <IconButton onClick={addNewTaskHandler}>
        <AddCircleIcon fontSize="large" color="info" />
      </IconButton>
    </form>
  );
};

export default NewTask;
