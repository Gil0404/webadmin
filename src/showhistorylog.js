export const Shistorylog = [
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
    field: "fullName",
    headerName: "Name",
    width: 100,
  },
  {
    field: "userID",
    headerName: "Surname",
    width: 100,
  },
];
  