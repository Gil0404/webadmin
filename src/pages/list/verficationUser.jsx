import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"

import DatatableVUser from "../../components/datatable/DatatableVerificationUser"


const Vuser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
  
        <DatatableVUser/>
      </div>
    </div>
  )
}

export default Vuser
