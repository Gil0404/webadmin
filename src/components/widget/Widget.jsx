import "./widget.scss";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { HowToReg,HowToRegOutlined} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
const Widget = ({ type }) => {
  const [vusernum, setVusernum] = useState(null);
  const [vdrivernum, setVdrivernum] = useState(null);
  const [usernum, setUsernum] = useState(null);
  const [drivernum, setDrivernum] = useState(null);
  let data;

  switch (type) {
    case "user":
      data = {  
        title: "USERS",
        count: usernum,
        query:"users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "driver":
      data = {
        title: "DRIVERS",
        count: drivernum,
        icon: (
          <PersonIcon
            className="icon"
      
              style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
            
          />
        ),
      };
      break;
    case "vuser":
      data = {
        title: "VERIFIED USERS",
        count: vusernum,
        icon: (
          <HowToRegOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "vdriver":
      data = {
        title: "VERIFIED DRIVERS",
        count: vdrivernum,
        icon: (
          <HowToReg
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {

      const drivers = query(
        collection(db, "drivers"),
       
      );
      const users = query(
        collection(db, "commuters"),
  
      );
      const vusers = query(
        collection(db, "commuters"),where("isVerified","==", true)
  
      );

      const vdriver = query(
        collection(db, "drivers"),where("isVerified","==", true)
 
      );

      const driversdata = await getDocs(drivers);
      const usersdata = await getDocs(users);
      const vusersdata = await getDocs(vusers);
      const vdrivesdata = await getDocs(vdriver);


      setDrivernum(driversdata.docs.length);
      setUsernum(usersdata.docs.length);
      setVusernum(vusersdata.docs.length);
      setVdrivernum(vdrivesdata.docs.length);
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
         {data.count}
        </span>
       
      </div>
      <div className="right">
       
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
