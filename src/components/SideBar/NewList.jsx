import './NewList.css';

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const NewList = (props) => {
  return (
    <div className="input-container">
      <FormControl>
        <Input placeholder="New list" className="input" />
      </FormControl>
      <IconButton>
        <AddCircleIcon color="info" />
      </IconButton>
    </div>
  );
};

export default NewList;
