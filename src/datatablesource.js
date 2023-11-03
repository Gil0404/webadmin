export const userColumns = [
  // { field: "id", headerName: "ID", width: 230 },
  
  {
    field: "user",
    headerName: "Profile Picture",
    width: 50,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profilePic} alt="avatar" />
         
        </div>
      );
    },
  },
  {
    field: "UserID",
    headerName: "User ID",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Fullname",
    width: 230,
  },

  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
 
  {
    field: "isVerified",
    headerName: "Verified",
    width: 160,
    renderCell: (params) => {
      if (params.row.isVerified === true) {
        return (
        
          <div className={`cellWithStatus ${params.row.isVerified}`}>
            {params.row.isVerified}
            true
          
          </div>
         
        );
        
      }else { return (
        
        <div className={`cellWithStatus ${params.row.isVerified}`}>
          {params.row.isVerified}
          false
        
        </div>
       
      );}
     
    },
  },
];
