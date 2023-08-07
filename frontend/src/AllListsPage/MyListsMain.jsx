import { useContext } from "react";
import SingleListMain from "./SingleListMain";
import ListsContext from "../context/lists-context";

import "./MyListsMain.css";

const MyListsMain = () => {
  const { lists } = useContext(ListsContext);

  const allLists =
    lists &&
    lists.map((list) => (
      <li key={list._id}>
        <SingleListMain
          key={list._id}
          id={list._id}
          name={list.name}
          list={list}
        />
      </li>
    ));

  return (
    <div className="lists-mainpage">
      {lists && lists.length === 0 && (
        <p className="empty">Your lists will appear here.</p>
      )}
      {lists && lists.length !== 0 && <ul>{allLists}</ul>}
    </div>
  );
};

export default MyListsMain;
