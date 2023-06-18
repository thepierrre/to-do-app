import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./NewTask.css";
import TagMenu from "./TagMenu";
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
    setEnteredTag,
    handleDayClick,
    tagMenuIsShown,
    selectedDay,
    addNewTaskHandler,
    selectedTag,
    setSelectedTag,
    tagListChangeHandler,
    tagMenuInputChangeHandler,
    tagOptions,
    tags,
    addNewTagHandler,
    setTags,
    menuTagInputChangeHandler,
    enteredMenuInputTag,
    setEnteredMenuInputTag,
    addNewTagFromMenuHandler,
  } = props;

  const handleAddButton = (event) => {
    addNewTaskHandler(event);
    addNewTagHandler(event);
  };

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
          startAdornment={
            <InputAdornment position="start">
              <TagMenu
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                tagListChangeHandler={tagListChangeHandler}
                tagMenuInputChangeHandler={tagMenuInputChangeHandler}
                tagOptions={tagOptions}
                tags={tags}
                setTags={setTags}
                menuTagInputChangeHandler={menuTagInputChangeHandler}
                enteredMenuInputTag={enteredMenuInputTag}
                setEnteredMenuInputTag={setEnteredMenuInputTag}
                addNewTagFromMenuHandler={addNewTagFromMenuHandler}
                setEnteredTag={setEnteredTag}
              />
            </InputAdornment>
          }
        />
      </FormControl>
      <IconButton onClick={handleAddButton}>
        <AddCircleIcon fontSize="large" color="info" />
      </IconButton>
    </form>
  );
};

export default NewTask;
