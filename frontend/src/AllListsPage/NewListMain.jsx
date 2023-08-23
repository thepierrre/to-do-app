import axios from "axios";
import { useContext } from "react";
import ListsContext from "../context/lists-context";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import { FormHelperText } from "@mui/material";

import "./NewListMain.css";

const NewListMain = () => {
  const {
    setLists,
    enteredList,
    setEnteredList,
    enteredListIsTouched,
    setEnteredListIsTouched,
    enteredListIsValid,
    setEnteredListIsValid,
  } = useContext(ListsContext);

  const enteredListIsInvalid = !enteredListIsValid && enteredListIsTouched;

  const listInputChangeHandler = (event) => {
    setEnteredList(event.target.value);

    if (enteredList.trim() !== "") {
      setEnteredListIsValid(true);
    }
  };

  const addNewListHandler = async (event) => {
    event.preventDefault();

    setEnteredListIsTouched(true);

    if (enteredList.trim() === "") {
      setEnteredListIsValid(false);
      return;
    }

    setEnteredListIsValid(true);

    try {
      const response = await axios.post(
        "https://mytodolists-62a4af294d6a.herokuapp.com/api/lists",
        {
          name: enteredList,
        }
      );
      if (response.data.list) {
        setLists((prevLists) => [...prevLists, response.data.list]);
        setEnteredList("");
      } else {
        console.log("Missing data in the response.");
      }
    } catch (err) {
      console.log("Error while adding a new list:", err);
    }
  };

  const addNewListOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      addNewListHandler(event);
    }
  };

  return (
    <div className="new-list-mainpage">
      <FormControl>
        <TextField
          autoComplete="off"
          className="new-list-mainpage__input"
          placeholder="New list's name"
          onKeyDown={addNewListOnEnterHandler}
          value={enteredList}
          variant="outlined"
          onChange={listInputChangeHandler}
          color="light"
          sx={{
            input: {
              "&::placeholder": {
                color: "rgb(229, 229, 229)",
                opacity: "1",
                fontFamily: "Oxygen",
                "@media only screen and (max-width: 600px)": {
                  fontSize: "1rem",
                },
              },
              color: "rgb(241, 241, 241)",
              fontSize: "1.15rem",
            },
          }}
          InputProps={{
            sx: { borderRadius: "0.75rem", borderColor: "rgb(241, 241, 241)" },
            maxLength: 50,
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={addNewListHandler} color="light">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText
          style={{
            fontSize: "1rem",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          {enteredListIsInvalid ? "Please enter a list name." : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default NewListMain;
