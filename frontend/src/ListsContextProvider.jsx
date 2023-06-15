import axios from "axios";
import { useState, useEffect } from "react";
import ListsContext from "./context/lists-context";

const ListsContextProvider = (props) => {
  const { children } = props; // <RouterProvider router={router} /> in main.jsx
  const [lists, setLists] = useState([]);
  const [enteredList, setEnteredList] = useState("");
  const [editedEnteredList, setEditedEnteredList] = useState("");
  const [enteredListIsTouched, setEnteredListIsTouched] = useState(false);
  const [enteredListIsValid, setEnteredListIsValid] = useState(false);
  const [listToEditId, setListToEditId] = useState(undefined);
  const [editedListIsValid, setEditedListIsValid] = useState(false);
  const [editedListIsTouched, setEditedListIsTouched] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "https://mytodolists-62a4af294d6a.herokuapp.com/api/lists"
        );
        setLists(response.data.lists);
      } catch (err) {}
    };
    fetchLists();
  }, []);

  return (
    <ListsContext.Provider
      value={{
        lists,
        setLists,
        enteredList,
        setEnteredList,
        editedEnteredList,
        setEditedEnteredList,
        enteredListIsTouched,
        setEnteredListIsTouched,
        enteredListIsValid,
        setEnteredListIsValid,
        listToEditId,
        setListToEditId,
        editedListIsValid,
        setEditedListIsValid,
        editedListIsTouched,
        setEditedListIsTouched,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
