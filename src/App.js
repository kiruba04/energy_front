
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loginpage from "./pages/loginpage/login"
import Registerpage from "./pages/registerpage/Register1";
import Homepage from "./pages/home/homepage";
import Registerasuser from "./pages/userup/Userup";
import CompanyDashboard from './pages/companydash/companydashboard';
import Future from './pages/futuretime/FutureBid';
import Live from './pages/livepage/livepage';
import Marketlive from './pages/marketplace/market';
import Aboutin from './pages/about/about';

function App() {
  return (
 <>
 <Router>
 <Routes>
  <Route path="/" element={<Homepage />} />
 <Route path="/login" element={<Loginpage />} />
 <Route path='/signup' element={<Registerpage/>}/>
 <Route path='/userreg' element={<Registerasuser/>}/>
 <Route path='/companydashboard' element={<CompanyDashboard/>}/>
 <Route path='/futurebiting' element ={<Future />} />
 <Route path='/livebiting' element ={<Live />} />
 <Route path='/marketplace' element={<Marketlive />} />
 <Route path='/about' element={<Aboutin/>} />
 </Routes>
 </Router>
 </>
  );
}

export default App;
