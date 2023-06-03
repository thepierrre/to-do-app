import "./Header.css";

const Header = (props) => {
  const { toggleSideBar, sideBarIsShown } = props;

  return (
    <>
      <header className="header">
        <h1>My Tasks</h1>
      </header>
    </>
  );
};

export default Header;
