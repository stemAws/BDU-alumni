import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminHeader from './component/AdminHeader'
const App = () => {
  return (
    <>
<Router >
<Routes>
<Route path="*" exact Component = {MainPage} />
<Route path="/admin" exact Component = {AdminHeader} />
</Routes>
</Router>
   
    </>
  )
}

export default App