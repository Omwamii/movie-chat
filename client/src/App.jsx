import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import './assets/styles/login.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuthContext } from './context/AuthContext';
import { React } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  
  return (
    <Router >
      <div>
        <Routes>
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/' element={authUser ? <Home />: <Navigate to="/login" />} />
        </Routes>
        <Toaster position='top-center'/>
      </div>
    </Router>
  );
}

export default App;