import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { HowToReg,HowToRegOutlined} from "@mui/icons-material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {  signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Sidebar = () => {
  const handleLogout = ()=>{
    

  signOut(auth).then(() => {
    // Sign-out successful.
    console.log(auth);
  }).catch((error) => {
    // An error happened.
  });
  }
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Angkas Atad</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
        
          <p className="title">User</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>List</span>
            </li>
          </Link>
          <Link to="/vuser" style={{ textDecoration: "none" }}>
            <li>
              <HowToRegOutlined className="icon" />
              <span>User Verification</span>
            </li>
          </Link>
       
          <p className="title">Driver</p>
          <Link to="/driver" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>List</span>
            </li>
          </Link>

          <Link to="/vdriver" style={{ textDecoration: "none" }}>
            <li>
              <HowToReg className="icon" />
              <span>Driver Verification</span>
            </li>
          </Link>
       
          <p className="title">Log out</p>
          <Link   onClick={handleLogout} style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span> Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
