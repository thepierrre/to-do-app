import axios from "axios";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import ListsContext from "./context/lists-context";
import NewListMain from "./AllListsPage/NewListMain";
import MyListsMain from "./AllListsPage/MyListsMain";
import EditListModal from "./AllListsPage/EditListModal";
import "./App.css";

const App = () => {
  const { setLists, listToEditId } = useContext(ListsContext);

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
    <div className="app">
      <div className="header">
        <h1 className="title">My To-do Lists</h1>
      </div>
      <div className="mainpage-content">
        <NewListMain />
        <MyListsMain />
      </div>
      {listToEditId && <EditListModal />}
      <Outlet />
    </div>
  );
};

export default App;
