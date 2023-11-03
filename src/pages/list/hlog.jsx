import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"


import ShowHlog from "../../components/datatable/Showhistorylogdt"


const Slog = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
     <ShowHlog />
      </div>
    </div>
  )
}

export default Slog
