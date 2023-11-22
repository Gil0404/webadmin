import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,startAt
} from "firebase/firestore";
import { db } from "../../firebase";
import { useReactToPrint } from "react-to-print";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { Shistorylogdate } from "../../showhistorylogreport";
import { Height } from "@mui/icons-material";

const Datelog = (props) => {
  const [searchkey, setSearchkey] = useState("")
  const [data, setData] = useState([]);
  const keys = ["id", "departureTime"]
  const componentPDF = useRef()

 
  let list = [];
  let dast = [];
  
let commuter
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
   let fchild
   
   let utc = new Date()
   let year = new Date().getFullYear()
   let month = parseInt(new Date().getMonth(),10) + 1
   let startdate = year + "-" + month + "-1" 
   let endsdate = year + "-" + month + "-31" 


   console.log("current date: ", startdate)
      get(child(ref(getDatabase()), "RIDES_LOG/")).then((snapshot) => {
        if (snapshot.exists()) {
         snapshot.forEach((childSnapshot) =>{
          // list.push({...childSnapshot.val() , id: childSnapshot.key})
          fchild = childSnapshot.val()
   
          // snapshot.child(fchild)
           childSnapshot.forEach((childs=>{
              let arrayreq = Object.keys(childs.val().data.request)
              let stringreq =arrayreq.toString()
             

          
              if(childs.val().data.status.dateCreated >= startdate && childs.val().data.status.dateCreated <= endsdate){
                let values = []
                childs.forEach((childdata=>{

                  childdata.child('request').forEach((childrequest=>{
                    values.push(childrequest.val().userInfo.fullName)
    
                  }))
                }))
                commuter =  [...new Set(values)]
             console.log("this is data: ", commuter)
             
                list.push({
                id:childs.key,
                departureTime:childs.val().data.status.departureTime,
                request: stringreq,
                driverName:childs.val().data.driverInfo.driverName,
                dateCreated:childs.val().data.status.dateCreated,
                description:childs.val().data.rideInfo.destination.description,
                commuters:commuter

                
              })
            }
           
           }))
               
         })


        } else {
          console.log("No data available");
        }        
        setData(list)
      }).catch((error) => {
        console.error(error);
      })
      
    
   
  }, []);

  const handleDelete = async (id) => {
    var deletevar = window.confirm("Delete this user ?");
    if ((deletevar) == true) {
      try {
        await deleteDoc(doc(db, "commuters", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
      }
    else {
        //some code
    }
  
   
  };

  const handleUpdate = async (id) => {
    try {
      await updateDoc(doc(db, "commuters", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const generatePDF = useReactToPrint({
    content:()=>componentPDF.current, 
    documentTitle:"History Ride",
    onAfterPrint:()=> alert("Data Saved")
  })

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          
              {/* <div className="viewButton" onClick={() => {navigate('/users/test', {replace: true , state:{
                UserID:params.row.UserID,
                fullName: params.row.fullName,
                email: params.row.email,
                faculty: params.row.faculty,
                address: params.row.address,
                mobileNo:params.row.mobileNo,
                profilePic:params.row.profilePic,
                request:params.row.id
                }})}}>View</div> */}
            
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
       
    <div className="datatable"  >
      <div className="datatableTitle">
        History
        <button  className="link" onClick={generatePDF}>
          PDF
        </button>
           {/* <input onChange={(e) => setSearchkey(e.target.value)}
         placeholder="Search"
         className="Searchinput"
         ></input> */}
      </div>
      <div className="datatable" ref={componentPDF} >
  
      <DataGrid
        className="datagrid"
        rows={(data)}
        columns={Shistorylogdate}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      </div>
    
    </div>
    
  );
};

export default Datelog;
