import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"


import Datelog from "../../components/datatable/datelog"


const Datelogs = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
     <Datelog />
      </div>
    </div>
  )
}

export default Datelogs
