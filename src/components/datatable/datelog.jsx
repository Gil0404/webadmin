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

const Datelog = (props) => {
  const [searchkey, setSearchkey] = useState("")
  const [data, setData] = useState([]);
  const keys = ["id", "departureTime"]
  const componentPDF = useRef()

 
  let list = [];
  let dast = [];
  
let commuter
  useEffect(() => {
  
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
             

          
              
                let values = []
                childs.forEach((childdata=>{

                  childdata.child('request').forEach((childrequest=>{
                    values.push(childrequest.val().userInfo.fullName)
    
                  }))
                }))
                commuter =  [...new Set(values)]
                    
                list.push({
                id:childs.key,
                departureTime:childs.val().data.status.departureTime,
                request: stringreq,
                driverName:childs.val().data.driverInfo.driverName,
                dateCreated:childs.val().data.status.dateCreated,
                description:childs.val().data.rideInfo.destination.description,
                commuters:commuter

                
              })
            
           
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


  const generatePDF = useReactToPrint({
    content:()=>componentPDF.current, 
    documentTitle:"History Ride",
  })




  const selectday = async (e) => {
  
    let fchild
    
    let utc = new Date()
    let year = new Date().getFullYear()
    let month = parseInt(new Date().getMonth(),10) + 1
    let startdate = year + "-" + month + "-1" 
    let endsdate = year + "-" + month + "-31" 
    let day = e;

    console.log("day :" , day)
 
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
              
 
           
               if(childs.val().data.status.dateCreated == day){
                 let values = []
                 childs.forEach((childdata=>{
 
                   childdata.child('request').forEach((childrequest=>{
                     values.push(childrequest.val().userInfo.fullName)
     
                   }))
                 }))
                 commuter =  [...new Set(values)]
              
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
       
     
    
   }
  
   
    const selectmonth = async (e) => {
  
    let fchild
    
    let utc = new Date()
    let year = new Date().getFullYear()
    let month = parseInt(new Date().getMonth(),10) + 1
    let startdate = e + "-1" 
    let endsdate = e+ "-31" 
  


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
       
     
    
   }

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
        <div>
       
       <input type="date" onChange={(e)=> selectday(e.target.value)}/>
        
      <input type="month" onChange={(e)=> selectmonth(e.target.value)}/>

      <button  className="link" onClick={generatePDF}>
          PDF
        </button>
        </div>
       
           {/* <input onChange={(e) => setSearchkey(e.target.value)}
         placeholder="Search"
         className="Searchinput"
         ></input> */}
      </div>
    
  
      <DataGrid
        className="datagrid"
        rows={(data)}
        columns={Shistorylogdate}
        pageSize={9}
        rowsPerPageOptions={[9]}
    
      />
    
      <div style={{display:'none'}}>
        <div  ref={componentPDF} style={{textAlign:"center"}}>
        <br></br>
        <br></br>
          <h2> Ride Report History</h2>
          <br></br>
      <table >
      <thead>
        <tr> 
          <th>Date</th>
          <th>Departure Time</th>
          <th>Destination</th>
          <th>Driver</th>
          <th>Commuters</th>

        </tr>
       
      </thead>
      <tbody>
       {data.map((item,index)=>(
        <tr key={index}>
          <td>{item.dateCreated}</td>
          <td>{item.departureTime}</td>
          <td>{item.description}</td>
          <td>{item.driverName}</td>
          <td>{item.commuters}</td>
        </tr>

       ))}
     
      </tbody>
    </table> 
    </div>
    </div>
    </div>
    
  );
};

export default Datelog;
