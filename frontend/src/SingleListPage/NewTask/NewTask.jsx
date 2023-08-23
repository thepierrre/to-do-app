import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import TasksContext from "../../context/tasks-context";
import IconButton from "@mui/material/IconButton";
import "./NewTask.css";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FormHelperText } from "@mui/material";
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
            autoComplete="off"
            variant="outlined"
            onChange={taskInputChangeHandler}
            onKeyDown={addNewTaskOnEnterHandler}
            className="new-task--input"
            placeholder="New task"
            id="outlined-adornment-task"
            value={enteredTask}
            color="light"
            sx={{
              input: {
                "&::placeholder": {
                  color: "rgb(229, 229, 229)",
                  opacity: "1",
                  fontFamily: "Oxygen",
                },
                color: "rgb(241, 241, 241)",
                fontSize: "1.15rem",
                "@media only screen and (max-width: 600px)": {
                  fontSize: "1rem",
                },
              },
            }}
            maxLength="50"
            InputProps={{
              sx: { borderRadius: "0.75rem" },
              maxLength: 30,
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
          <FormHelperText
            style={{
              fontSize: "1rem",
              textAlign: "center",
              margin: "1.1rem 0 0 0",
            }}
          >
            {enteredTaskIsInvalid ? "Please enter a task name." : null}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            autoComplete="off"
            variant="outlined"
            onChange={tagInputChangeHandler}
            onKeyDown={addNewTaskOnEnterHandler}
            value={enteredTag}
            color="light"
            InputProps={{
              sx: { borderRadius: "0.75rem" },
              maxLength: 15,
            }}
            sx={{
              input: {
                "&::placeholder": {
                  color: "rgb(229, 229, 229)",
                  opacity: "1",
                  fontFamily: "Oxygen",
                },
                color: "rgb(241, 241, 241)",
                fontSize: "1.15rem",
                "@media only screen and (max-width: 600px)": {
                  fontSize: "1rem",
                },
              },
            }}
            className="new-task-tag--input"
            placeholder="Tag (optional)"
          />
        </FormControl>
      </div>
      <IconButton onClick={handleAddButton} className="add-button">
        <AddIcon fontSize="large" color="light" />
      </IconButton>
    </form>
  );
};

export default NewTask;
