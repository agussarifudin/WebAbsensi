import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login'
import Registrasi from './Components/Registrasi'


function App() {
  return (
  <Router>
    <Routes>
    <Route path={"/"} element={<Home/>}/>
    <Route path={"/home"} element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/registrasi"  element={<Registrasi/>}/>
    </Routes>
  </Router>
  );
}

export default App;
