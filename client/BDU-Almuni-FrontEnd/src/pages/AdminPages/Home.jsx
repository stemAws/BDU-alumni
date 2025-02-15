import "../../styles/home.css";
// import Users from './Users'
import Charts from "./Charts";
const home = () => {
  console.log("Home component rendered");

  return (
    <div className="home">
      <Charts />
      {/* <Users/> */}
    </div>
  );
};

export default home;
