
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody';
import Stories from './Stories';
import Events from './Events';
const MainPage = () => {
  return (
    <div>
        <Router >
          <Routes>
          <Route path="/" exact Component = {MainBody} />
          <Route path="/Stories"  Component = {Stories} />
          <Route path="/Events"  Component = {Events} />
          </Routes>
        </Router>
    </div>
  )
}

export default MainPage