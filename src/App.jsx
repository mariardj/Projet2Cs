
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Notifications from './components/Notifications';
import HistoryP from './components/HistoryP';
import Dashboard from './components/Dashboard';
import ReportsPage from './components/ReportsPage';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/history" element={<HistoryP />} />
        <Route path="/Home" element={<Home />} />
    
        <Route path="/Notifications" element={<Notifications />} />
       

        <Route path="/Dashboard" element={<Dashboard idForage={68}/>} />
             <Route path="/reports" element={<ReportsPage />} />
      </Routes>

    </div>
  );
}

export default App;
