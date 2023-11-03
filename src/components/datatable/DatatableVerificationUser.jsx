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
import { db } from "../../firebase";
import { userVColumn } from "../../datatablesourceVerificationUser";

const DatatableVUser = () => {
  const [data, setData] = useState([]);

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
      query(collection(db, "commuters"),where('isVerified', "==", false)),
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
    var deletevar = window.confirm("Delete this user ?")
    if(deletevar){ 
      try {
      await deleteDoc(doc(db, "commuters", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }else{

    }
   
  };

  const handleUpdate = async (id) => {
    var updatevar = window.confirm("Verified this user ?");
    if ((updatevar) == true) {
      try {
        await updateDoc(doc(db, "commuters", id ), {isVerified: true});
      } catch (err) {
        console.log(err);
      }
    }
    else {
        //some code
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
       User Verification
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userVColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableVUser;
