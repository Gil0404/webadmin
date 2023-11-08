import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { driverColumns } from "../../datatablesourceDriver";

const DatatableDriver = () => {
  const [searchkey, setSearchkey] = useState("")
  const [data, setData] = useState([]);
  const keys = ["fullName", "teacherID" , "plateNo" , "email"]
  const search = (data) => {
    return data.filter((item)=>keys.some(keys=>item[keys].toLowerCase().includes(searchkey))
    
    )
  }
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

    const unsub = onSnapshot(
      collection(db, "drivers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    var deletevar = window.confirm("Delete this user ?");
    if ((deletevar) == true) {
      try {
        await deleteDoc(doc(db, "drivers", id));
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
      await updateDoc(doc(db, "drivers", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
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
        Driver Lists
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
         <input onChange={(e) => setSearchkey(e.target.value)}
         placeholder="Search"
         className="Searchinput"
         ></input>
      </div>
     
      <DataGrid
        className="datagrid"
        rows={search(data)}
        columns={driverColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
    </div>
  );
};

export default DatatableDriver;
