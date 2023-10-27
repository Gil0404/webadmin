import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        <div className="widgets">
          <Widget type="user" />
          <Widget type="vuser" />
          <Widget type="driver" />
          <Widget type="vdriver" />
        </div>
      </div>
    </div>
  );
};

export default Home;
