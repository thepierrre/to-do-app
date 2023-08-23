import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ListsContext from "../context/lists-context";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./SingleListMain.css";

const SingleListMain = (props) => {
  const { setLists, setListToEditId, setEditedEnteredList } =
    useContext(ListsContext);
  const { name, id, list } = props;

  const setListToEditHandler = (listId) => {
    setEditedEnteredList(name);
    setListToEditId(listId);
  };

  const removeListHandler = async (listId) => {
    try {
      await axios.delete(
        `https://mytodolists-62a4af294d6a.herokuapp.com/api/lists/${listId}`
      );
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (err) {}
  };

  return (
    <div className="single-list-mainpage">
      <div className="bar-element__edit">
        <IconButton
          color="primary"
          onClick={() => setListToEditHandler(list._id)}
        >
          <EditOutlinedIcon />
        </IconButton>
      </div>
      <div className="bar-element__name">
        <Link
          to={`/list/${id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          {name}
        </Link>
      </div>
      <div className="bar-element__remove">
        <IconButton color="primary" onClick={() => removeListHandler(list._id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleListMain;
