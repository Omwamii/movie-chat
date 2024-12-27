import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import './assets/styles/login.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuthContext } from './context/AuthContext';
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Router >
      <div>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;