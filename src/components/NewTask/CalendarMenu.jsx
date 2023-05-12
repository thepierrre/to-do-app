import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CalendarMenu = (props) => {

  return (
    <>
      <IconButton aria-label="open a calendar" edge="start">
        <CalendarMonthIcon />
      </IconButton>
      <Menu>
        <h1>hahaha</h1>
        <h2>hehehe</h2>
        <h3>hihihi</h3>
      </Menu>
    </>
  );
};

export default CalendarMenu;
