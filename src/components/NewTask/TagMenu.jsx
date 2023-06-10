import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ITEM_HEIGHT = 48;

const TagMenu = (props) => {
  const {
    tagListChangeHandler,
    tagMenuInputChangeHandler,
    tagOptions,
    addNewTagToMenuOnEnterHandler,
    tags,
    setTags,
    menuTagInputChangeHandler,
    EnteredMenuInputTag,
    setEnteredMenuInpuTag,
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

  const handleOptionClick = (option) => {
    setSelectedTag(option);
    handleClose();
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
            width: "20ch",
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
        />
        <IconButton onClick={addNewTagFromMenuHandler}>
          <AddCircleIcon />
        </IconButton>
      </Menu>
    </div>
  );
};

export default TagMenu;
