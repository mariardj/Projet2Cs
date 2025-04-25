import logo from './logo.svg';
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
function App() {
  return (
    <div className="App">
      <Notifications/>
    </div>
  );
}

export default App;
