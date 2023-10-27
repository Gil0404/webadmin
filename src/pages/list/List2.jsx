import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"

import DatatableDriver from "../../components/datatable/DatatableDriver"


const List2 = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">

        <DatatableDriver/>
      </div>
    </div>
  )
}

export default List2
