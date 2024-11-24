import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import Channels from './components/Channels';
import Chat from './components/Chat';
import Nav from './components/Nav';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className='container'>
      <Nav />
      {/* <Chat /> */}
      <MovieList />

    </div>
  );
}

export default App;