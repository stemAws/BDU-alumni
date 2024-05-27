import { Route, Routes } from 'react-router-dom';
import Events from './Events';
import MainBody from './MainBody';
import Stories from './Stories';
// import Explore from './Explore'
const MainPage = () => {
  return (
    <div>

          <Routes>
          <Route path="/" exact Component = {MainBody} />
          <Route path="/Stories"  Component = {Stories} />
          <Route path="/Events"  Component = {Events} />
          
          </Routes>
          {/* <Explore/> */}
    </div>
  )
}

export default MainPage


