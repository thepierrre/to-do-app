import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import "./TagMenu.css";
import Input from "@mui/material/Input";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ITEM_HEIGHT = 48;

const TagMenu = (props) => {
  const {
    tags,
    menuTagInputChangeHandler,
    enteredMenuInputTag,
    addNewTagFromMenuHandler,
    setEnteredTag,
  } = props;

  const { selectedTag, setSelectedTag } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onKeyDown = (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      addNewTagFromMenuHandler(event);
    }
  };

  return (
    <div>
      <IconButton id="long-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "22ch",
          },
        }}
      >
        {tags.map((tag) => (
          <MenuItem key={tag} onClick={() => setEnteredTag(tag)}>
            {tag}
          </MenuItem>
        ))}
        <Input
          type="text"
          placeholder="New tag"
          onChange={menuTagInputChangeHandler}
          onKeyDown={onKeyDown}
          className="tag-menu-input"
          value={enteredMenuInputTag}
        />
        <IconButton onClick={addNewTagFromMenuHandler}>
          <AddCircleIcon color="info" />
        </IconButton>
      </Menu>
    </div>
  );
};

export default TagMenu;
