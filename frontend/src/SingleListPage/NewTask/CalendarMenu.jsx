import { useState } from "react";
import { DayPicker } from "react-day-picker";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Menu from "@mui/material/Menu";

const CalendarMenu = (props) => {
  const { handleDayClick, selectedDay } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="open a calendar"
        edge="start"
        onClick={handleClick}
      >
        {!selectedDay ? (
          <EditCalendarIcon color="light" />
        ) : (
          <EventAvailableIcon color="light" />
        )}
      </IconButton>
      <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={handleDayClick}
        />
      </Menu>
    </>
  );
};

export default CalendarMenu;
