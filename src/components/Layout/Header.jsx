import "./Header.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Header = (props) => {
  const { toggleSideBar, sideBarIsShown } = props;

  return (
    <>
      <header className="header">
        <IconButton className="option-bar-button" onClick={toggleSideBar}>
          {!sideBarIsShown && <MenuIcon fontSize="large" />}
          {sideBarIsShown && <MenuOpenIcon fontSize="large" />}
        </IconButton>
        <h1>My Tasks</h1>
      </header>
    </>
  );
};

export default Header;
