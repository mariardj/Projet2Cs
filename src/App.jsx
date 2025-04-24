import logo from './logo.svg';
import NavBar from "./components/NavBar"; // Import the Navbar component
import SidebarAndNavbar from './components/SidebarAndNavbar';
import RemarqueCard from './components/RemarqueCard';
import RegionFilter from './components/RegionFilter';
import ViewsFilter from './components/ViewsFilter';
import SignIn from './components/SignIn';
import TerrainTable from './components/TerrainTable';
import TableView from './components/TableView';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       {/* { <SidebarAndNavbar /> } */}
        {/* { <RegionFilter /> } */}
        {/* { <SignIn /> } */}
        
       {/* { <ViewsFilter /> }   */}
       {/* <div style={{ padding: '20px' }}>
      <RemarqueCard
        title="Titre de la remarque"
        body="Corp de la solution..Corp de la solution.."
        severity="High"
      />
    </div> */}
      <NavBar />
      {/* <TerrainTable /> */}
      <TableView />
     
      </header>
    </div>
  );
}

export default App;
