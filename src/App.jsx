import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar"; // Import the Navbar component
import SidebarAndNavbar from './components/SidebarAndNavbar';
import RemarqueCard from './components/RemarqueCard';
import RegionFilter from './components/RegionFilter';
import ViewsFilter from './components/ViewsFilter';
import SignIn from './components/SignIn';
import TerrainTable from './components/TerrainTable';
import Home from './components/Home';
import Filesview from './components/Filesview';
import Notifications from './components/Notifications';
import Dashboardsview from './components/Dashboardsview';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/TerrainTable" element={<TerrainTable />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Filesview" element={<Filesview />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Dashboardsview" element={<Dashboardsview />} />
      </Routes>

    </div>
  );
}

export default App;
