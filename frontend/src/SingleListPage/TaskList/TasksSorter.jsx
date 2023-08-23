import { useState } from "react";
import {
  TEXT_SORT,
  DATE_SORT,
  DONE_SORT,
  TAG_SORT,
  DESC_SORT,
  ASC_SORT,
  getSortedTasks,
  DEFAULT_SORT,
} from "../../utils/sortingFunctions";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const TasksSorter = (props) => {
  const { sortedBy, setSortedBy } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let sorterText;
  if (sortedBy.feature === DONE_SORT) {
    if (sortedBy.direction === ASC_SORT) {
      sorterText = "Status: to-do first";
    } else {
      sorterText = "Status: done first";
    }
  }
  if (sortedBy.feature === DATE_SORT) {
    if (sortedBy.direction === ASC_SORT) {
      sorterText = "Date: oldest first";
    } else {
      sorterText = "Date: newest first";
    }
  }
  if (sortedBy.feature === TEXT_SORT) {
    if (sortedBy.direction === ASC_SORT) {
      sorterText = "Task: A-Z";
    } else {
      sorterText = "Task: Z-A";
    }
  }
  if (sortedBy.feature === TAG_SORT) {
    if (sortedBy.direction === ASC_SORT) {
      sorterText = "Tag: A-Z";
    } else {
      sorterText = "Tag: Z-A";
    }
  }

  const toDoFirstHandler = () => {
    setSortedBy({ feature: DONE_SORT, direction: ASC_SORT });
    handleClose();
  };
  const doneFirstHandler = () => {
    setSortedBy({ feature: DONE_SORT, direction: DESC_SORT });
    handleClose();
  };
  const tasksAscHandler = () => {
    setSortedBy({ feature: TEXT_SORT, direction: ASC_SORT });
    handleClose();
  };
  const tasksDescHandler = () => {
    setSortedBy({ feature: TEXT_SORT, direction: DESC_SORT });
    handleClose();
  };
  const dateOldFirstHandler = () => {
    setSortedBy({ feature: DATE_SORT, direction: ASC_SORT });
    handleClose();
  };
  const dateNewFirstHandler = () => {
    setSortedBy({ feature: DATE_SORT, direction: DESC_SORT });
    handleClose();
  };
  const tagsAscHandler = () => {
    setSortedBy({ feature: TAG_SORT, direction: ASC_SORT });
    handleClose();
  };
  const tagsDescHandler = () => {
    setSortedBy({ feature: TAG_SORT, direction: DESC_SORT });
    handleClose();
  };
  const defaultSortHandler = () => {
    setSortedBy(DEFAULT_SORT);
  };

  return (
    <div>
      <Button
        id="filter-tasks-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="light"
      >
        {sorterText ? sorterText : "SORT TASKS"}
      </Button>
      {sortedBy !== DEFAULT_SORT && (
        <Button
          id="reset-filters-button"
          onClick={defaultSortHandler}
          color="light"
        >
          RESET
        </Button>
      )}
      <Menu
        id="filter-tasks-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={toDoFirstHandler}>Status: to-do first</MenuItem>
        <MenuItem onClick={doneFirstHandler}>Status: done first</MenuItem>
        <MenuItem onClick={tasksAscHandler}>Task: A-Z</MenuItem>
        <MenuItem onClick={tasksDescHandler}>Task: Z-A</MenuItem>
        <MenuItem onClick={dateNewFirstHandler}>Date: newest first</MenuItem>
        <MenuItem onClick={dateOldFirstHandler}>Date: oldest first</MenuItem>
        <MenuItem onClick={tagsAscHandler}>Tag: A-Z</MenuItem>
        <MenuItem onClick={tagsDescHandler}>Tag: Z-A</MenuItem>
      </Menu>
    </div>
  );
};

export default TasksSorter;
