import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import './assets/styles/login.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
        {/* <Login /> */}
        {/* <Signup /> */}
       <Nav />
        {/* <Chat /> */}
        {/* <MovieList /> */}
    </div>
  );
}

export default App;