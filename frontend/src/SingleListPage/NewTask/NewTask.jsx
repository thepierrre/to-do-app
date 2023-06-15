import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import TasksContext from "../../context/tasks-context";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./NewTask.css";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMenu from "./CalendarMenu";

const NewTask = () => {
  const {
    setTasks,
    enteredTask,
    enteredTag,
    setEnteredTask,
    enteredTaskIsValid,
    setEnteredTaskIsValid,
    setEnteredTag,
    enteredTaskIsTouched,
    setEnteredTaskIsTouched,
    selectedDay,
    setSelectedDay,
  } = useContext(TasksContext);

  const { listId } = useParams();

  const enteredTaskIsInvalid = !enteredTaskIsValid && enteredTaskIsTouched;

  const handleAddButton = (event) => {
    addNewTaskHandler(event);
  };

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);

    if (enteredTask.trim() !== "") {
      setEnteredTaskIsValid(true);
    }
  };

  const tagInputChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const addNewTaskHandler = async (event) => {
    event.preventDefault();

    setEnteredTaskIsTouched(true);

    if (enteredTask.trim() === "") {
      setEnteredTaskIsValid(false);
      return;
    }

    setEnteredTaskIsValid(true);

    try {
      const response = await axios.post(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/${listId}`,
        {
          text: enteredTask,
          date: selectedDay,
          tag: enteredTag,
        }
      );

      if (response.data.task) {
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
      } else {
        console.log("Missing data in the response.");
      }
      setEnteredTask("");
      setEnteredTag("");
    } catch (err) {
      console.log("Error while adding a new task:", err);
    }
  };

  const addNewTaskOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      addNewTaskHandler(event);
    }
  };

  const handleDayClick = (day, { selectedDay }) => {
    setSelectedDay(selectedDay ? undefined : day);
  };

  return (
    <form className="new-task">
      <div className="new-task__inputs">
        <FormControl>
          <TextField
            error={enteredTaskIsInvalid ? true : null}
            helperText={enteredTaskIsInvalid ? "Please enter a task." : null}
            variant="standard"
            onChange={taskInputChangeHandler}
            onKeyDown={addNewTaskOnEnterHandler}
            className="new-task--input"
            placeholder="New task"
            id="outlined-adornment-task"
            value={enteredTask}
            maxLength="50"
            InputProps={{
              maxLength: 50,
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMenu
                    handleDayClick={handleDayClick}
                    selectedDay={selectedDay}
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            variant="standard"
            onChange={tagInputChangeHandler}
            onKeyDown={addNewTaskOnEnterHandler}
            value={enteredTag}
            inputProps={{ maxLength: 15 }}
            className="new-task-tag--input"
            placeholder="Tag (optional)"
          />
        </FormControl>
      </div>
      <IconButton onClick={handleAddButton} className="add-button">
        <AddCircleIcon fontSize="large" color="info" />
      </IconButton>
    </form>
  );
};

export default NewTask;
