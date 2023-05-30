import "./SideBar.css";
import MyLists from "./MyLists";
import NewList from "./NewList";

const SideBar = (props) => {
  const { sideBarIsShown, TASKS, LISTS } = props;

  return (
    <>
      <div className={`side-bar ${sideBarIsShown ? "disappear" : "appear"}`}>
        <MyLists TASKS={TASKS} LISTS={LISTS} />
        <NewList />
      </div>
    </>
  );
};

export default SideBar;
