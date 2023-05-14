import './SideBar.css';

const OptionBar = props => {
    return (
        <>
            <div className='option-bar'>
                <h1>My Lists</h1>
                <ul>
                    <li>Programming</li>
                    <li>Languages</li>
                    <li>Others</li>
                    <li>Household</li>
                    <li>Sport</li>
                    <li>Reading</li>
                </ul>
            </div>
        </>
    )
}

export default OptionBar;