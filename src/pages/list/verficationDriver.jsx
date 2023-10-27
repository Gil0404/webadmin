import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"


import DatatableVDriver from "../../components/datatable/DatatableVerificationDriver"


const Vdriver = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
     
        <DatatableVDriver/>
      </div>
    </div>
  )
}

export default Vdriver
