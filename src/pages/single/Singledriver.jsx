import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { Shistorylog } from "../../showhistorylog";
import { DataGrid } from "@mui/x-data-grid";
import { Shistorylogdriver } from "../../showhistorylogdriver";

const Singledriver = (props) => {

const location = useLocation()
const [searchkey, setSearchkey] = useState("")
const [data, setData] = useState([]);
const keys = ["id", "departureTime","request"]


let list = [];
let dast = [];
useEffect(() => {
  // const fetchData = async () => {
  //   let list = [];
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       list.push({ id: doc.id, ...doc.data() });
  //     });
  //     setData(list);
  //     console.log(list);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // fetchData();

  // LISTEN (REALTIME)    
 let commuter
    get(child(ref(getDatabase()), "RIDES_LOG/")).then((snapshot) => {
      if (snapshot.exists()) {
       snapshot.forEach((childSnapshot) =>{
        // list.push({...childSnapshot.val() , id: childSnapshot.key})      

        console.log("++++++++++++++++++++++++++++++++++++++")
        // snapshot.child(fchild)
        if(childSnapshot.key.includes(location.state.request)){
         childSnapshot.forEach((childs=>{
          let values =[]

            childs.forEach((childdata=>{

              childdata.child('request').forEach((childrequest=>{
                values.push(childrequest.val().userInfo.fullName)

              }))
            }))
            commuter =  [...new Set(values)]
console.log(commuter)
            list.push({
              id:childs.key,
              departureTime:childs.val().data.status.departureTime,
              driverName:childs.val().data.driverInfo.driverName,
              dateCreated:childs.val().data.status.dateCreated,
              description:childs.val().data.rideInfo.destination.description,
              commuters:commuter

              
            })
          
            console.log("++++++++++++++++++++++++++++++++++++++")
         }))
        }
       })


      } else {
        console.log("No data available");
      }        
      setData(list)
    }).catch((error) => {
      console.error(error);
    })
    
  
 
}, []);

const search = async(data) => {
  console.log(data)
  const d = await data
  return data.filter((item)=>keys.some(keys=>item[keys].toLowerCase().includes(searchkey))
  
  )
}
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className=""></div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={location.state.profilePic}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{location.state.fullName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{location.state.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{location.state.mobileNo}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                   {location.state.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <div className="datatable">
      <div className="datatableTitle">
      </div>
      <DataGrid
        className="datagrid"
        rows={(data)}
        columns={Shistorylogdriver}
        pageSize={9}
        rowsPerPageOptions={[9]}

      />
     
    </div>      </div>
      
      </div>
    </div>
  );
};

export default Singledriver;
