import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query
} from "firebase/firestore";
import { db, dbs } from "../../firebase";
import { Shistorylog } from "../../showhistorylog";
import { getDatabase, ref, child, get, onValue } from "firebase/database";

const ShowHlog = () => {
  const [searchkey, setSearchkey] = useState("")
  const [data, setData] = useState([]);
  const keys = ["id", "departureTime"]

 
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
   let fchild
   let values
      get(child(ref(getDatabase()), "RIDES_LOG/")).then((snapshot) => {
        if (snapshot.exists()) {
         snapshot.forEach((childSnapshot) =>{
          // list.push({...childSnapshot.val() , id: childSnapshot.key})
          fchild = childSnapshot.val()
          console.log(fchild)
          console.log("++++++++++++++++++++++++++++++++++++++")
          // snapshot.child(fchild)
           childSnapshot.forEach((childs=>{
              values = childs.val()
              let arrayreq = Object.keys(childs.val().data.request)
              let stringreq =arrayreq.toString()

              list.push({
                id:childs.key,
                departureTime:childs.val().data.status.departureTime,
                request: stringreq,
                driverName:childs.val().data.driverInfo.driverName
              })
              console.log(list)
              console.log("++++++++++++++++++++++++++++++++++++++")
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

  const search = async(data) => {
    console.log(data)
    return data.filter((item)=>keys.some(keys=>item[keys].toLowerCase().includes(searchkey))
    
    )
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
   console.log(data);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           <div
              className="updateButton"
              onClick={() => handleUpdate(params.row.id)}
            >
              Verify
            </div>
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
    <div className="datatable">
      <div className="datatableTitle">
       History Rides
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={Shistorylog}
        pageSize={9}
        rowsPerPageOptions={[9]}

      />
     
    </div>
    
  );
};

export default ShowHlog;
