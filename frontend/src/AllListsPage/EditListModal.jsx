import axios from "axios";
import { useContext } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import ListsContext from "../context/lists-context";

import "./EditListModal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const portalElement = document.getElementById("overlays");

const EditListModal = () => {
  const {
    editedListIsValid,
    setEditedListIsValid,
    editedListIsTouched,
    setEditedListIsTouched,
  } = useContext(ListsContext);

  const {
    setLists,
    listToEditId,
    setListToEditId,
    editedEnteredList,
    setEditedEnteredList,
  } = useContext(ListsContext);

  const editedListIsInvalid = !editedListIsValid && editedListIsTouched;

  const editModalCloseHandler = () => {
    setListToEditId(undefined);
  };

  const editedListInputChangeHandler = (event) => {
    setEditedEnteredList(event.target.value);

    if (editedEnteredList.trim() !== "") {
      setEditedListIsValid(true);
    }
  };

  const editListNameHandler = async () => {
    setEditedListIsTouched(true);

    if (editedEnteredList.trim() === "") {
      setEditedListIsValid(false);
      return;
    }

    try {
      const response = await axios.patch(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/${listToEditId}`,
        {
          name: editedEnteredList,
        }
      );

      if (response.data.list) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list._id === listToEditId
              ? { ...list, name: response.data.list.name }
              : list
          )
        );
      } else {
        console.log("Missing data in the response:", "123");
      }
    } catch (err) {
      console.log("Error while adding a new list:", err);
    }

    setListToEditId(undefined);
  };

  const editListNameOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      editListNameHandler(event);
    }
  };

  return (
    <>
      <Backdrop onClick={editModalCloseHandler} />
      <div className="list-edit-modal">
        <TextField
          className="list-edit-modal--input"
          error={editedListIsInvalid ? true : null}
          placeholder="New name"
          onKeyDown={editListNameOnEnterHandler}
          value={editedEnteredList}
          variant="standard"
          helperText={editedListIsInvalid ? "Please enter a list name." : null}
          onChange={editedListInputChangeHandler}
        />

        <div className="list-edit-modal--buttons">
          <Button
            variant="outlined"
            color="error"
            onClick={editModalCloseHandler}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={editListNameHandler}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditListModal;
