import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextField from "@mui/material/TextField";
import "./NewTask.css";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Input from "@mui/material/Input";
import CalendarMenu from './CalendarMenu';

const NewTask = (props) => {
  const { taskInputChangeHandler } = props;

  return (
    <form className="new-task">
      <FormControl>
        {/* <InputLabel htmlFor="outlined-adornment-task">
          Add a new task
        </InputLabel> */}
        <Input
          className="new-task--input"
          placeholder="Add a new task"
          id="outlined-adornment-task"
          startAdornment={
            <InputAdornment position="start">
              <CalendarMenu />
              {/* <IconButton
                aria-label="open a calendar"
                edge="start"
              >
                <CalendarMonthIcon></CalendarMonthIcon>
              </IconButton> */}
            </InputAdornment>
          }
        />
      </FormControl>
      {/* <TextField
        id="new-task"
        variant="standard"
        className="new-task--input"
        placeholder="Add a new task"
        onChange={taskInputChangeHandler}
      /> */}
      <IconButton onClick={props.addNewTaskHandler}>
        <AddCircleIcon fontSize="large" color="info" />
      </IconButton>
    </form>
  );
};

export default NewTask;

// <OutlinedInput
//   id="outlined-adornment-password"
//   type={showPassword ? 'text' : 'password'}
//   endAdornment={
//     <InputAdornment position="end">
//       <IconButton
//         aria-label="toggle password visibility"
//         onClick={handleClickShowPassword}
//         onMouseDown={handleMouseDownPassword}
//         edge="end"
//       >
//         {showPassword ? <VisibilityOff /> : <Visibility />}
//       </IconButton>
//     </InputAdornment>
//   }
//   label="Password"
// />
