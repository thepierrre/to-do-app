import './SideBar.css';
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const SideBar = ({ sideBarIsShown }) => {
    return (
        <>
            <div className={`side-bar ${sideBarIsShown ? 'disappear' : 'appear'}`}>
               <div className="side-bar--content">
                <h2>My Lists</h2>
                <ul>
                    <li>Programming</li>
                    <li>Languages</li>
                    <li>Others</li>
                    <li>Household</li>
                    <li>Sport</li>
                    <li>Reading</li>
                </ul>
                <div className="input-items">
                <FormControl>
                    <Input placeholder="New list" className="my-lists--input"/>
                </FormControl>
                <IconButton>
                    <AddCircleIcon color="info"/>
                </IconButton>
                </div>
                </div>
            </div>
        </>
    )
}

export default SideBar;