import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar () {
    return (
        <div className="sidebar">
            <img src={avatar} alt="Default avatar" className="avatar" />
            <p className="sidebar__username">User name</p>
        </div>
    )
}

export default SideBar;