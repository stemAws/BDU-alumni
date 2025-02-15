import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
