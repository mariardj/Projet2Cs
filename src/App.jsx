import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
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
import TableView from './components/TableView';
import CostStatusPage from './components/CostStatusPage';
import ReservoirProgressChart from './components/ReservoirProgressChart';
import HistoryP from './components/HistoryP';
import StatsCards from './components/StatsCards';
import DrillingProgressChart from './components/DrillingProgressChart';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/history" element={<HistoryP />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Filesview" element={<Filesview />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Dashboardsview" element={<Dashboardsview />} />
        <Route path="/TableView" element={<TableView/>} />
        <Route path="/CostStatus" element={<CostStatusPage />} />
        <Route path="/ReservoirProgressChart" element={<ReservoirProgressChart />} />
        <Route path="/StatsCards" element={<StatsCards />} />
        <Route path="/DrillingProgressChart" element={<DrillingProgressChart />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;
