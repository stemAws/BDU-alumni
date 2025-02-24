import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminSignin from "./component/AdminSignin";
import Unsubscribe from "./pages/Unsubscribe";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
