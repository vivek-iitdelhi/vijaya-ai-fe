import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/pages/Dashboard";
import ContactUs from "./components/pages/ContactUs";
import LogIn from "./components/pages/LogIn";
import DatasetManager from "./components/pages/dashboardItems/sidebarItems/Manage/DatasetManager";
import { initializeGA, logPageView } from "./analytics";

function App() {
  const location = useLocation(); // For tracking route changes

  useEffect(() => {
    initializeGA(); // Initialize GA once when the app loads
  }, []);

  useEffect(() => {
    logPageView(location.pathname); // Log page views on route changes
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/manage/:project_id" element={<DatasetManager />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
