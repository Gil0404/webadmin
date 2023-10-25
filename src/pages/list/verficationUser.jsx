import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableVUser from "../../components/datatable/DatatableVerificationUser"


const Vuser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableVUser/>
      </div>
    </div>
  )
}

export default Vuser
