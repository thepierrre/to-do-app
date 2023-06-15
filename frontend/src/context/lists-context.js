import { createContext } from "react";

const ListsContext = createContext({
  lists: [],
  setLists: () => {},
  enteredList: "",
  setEnteredList: () => {},
  editedEnteredList: "",
  setEditedEnteredList: () => {},
  enteredListIsTouched: false,
  setEnteredListIsTouched: () => {},
  enteredListIsValid: false,
  setEnteredListIsValid: () => {},
  listToEditId: undefined,
  setListToEditId: () => {},
  editedListIsValid: false,
  setEditedListIsValid: () => {},
  editedListIsTouched: false,
  setEditedListIsTouched: () => {},
  listName: "",
  setListName: () => {},
});

export default ListsContext;
