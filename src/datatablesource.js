export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "firstName",
    headerName: "Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Surname",
    width: 100,
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
