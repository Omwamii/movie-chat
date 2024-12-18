// Navigation
// import { NavLink } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import MyChannels from "./MyChannels";
import AllChannels from './AllChannels.jsx';
import MovieCategories from "./MovieCategories.jsx";
import SeriesCategories from "./SeriesCategories.jsx"
import MovieList from './MovieList';
import Chat from './Chat';
import SeriesList from './SeriesList';
import useGetAllChannels from '../hooks/useGetAllChannels';
import useGetUserChannels from '../hooks/useGetUserChannels.js';
import useChannels from '../z-store/useChannels';

function Nav() {
    const [value, setValue] = useState('');
    const [showMyChannels, setShowMyChannels] = useState(true);
    const [showAllChannels, setShowAllChannels] = useState(false);
    const [showMovieCategories, setShowMovieCategories] = useState(false);
    const [showSeriesCategories, setShowSeriesCategories] = useState(false);
    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);
    const [activeNavLink, setActiveNavLink] = useState(null);
    const linkRef = useRef(null);
    const [seriesGenres, setSeriesGenres] = useState([]);
    const [moviesGenres, setMoviesGenres] = useState([]);
    const { loading: allChannelsLoading, allChannels } = useGetAllChannels();
    const { loading: myChannelsLoading, myChannels } = useGetUserChannels();

    // const [placeholder, setPlaceholder] = useState("Trending🔥"); // placeholder for <Search /> component, to change with genres

    const navElement = document.getElementsByClassName('nav')[0];
    const contentElement = document.getElementsByClassName('content')[0];

    useEffect(() => {
      if (linkRef.current) {
        // click first nav link (show my chats first / on reload )
        linkRef.current.click();
        console.log('triggering first nav click');
      }
    }, []);

    useEffect(() => {
      fetchSeriesGenres();
      fetchMoviesGenres();
    }, []);

    function handleAllChannelsClicked(event) {
      console.log(allChannels)
        
      showContent();

        if (activeNavLink) {
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        }

        if (showMyChannels) {
            setShowMyChannels(false)
        } else if (showMovieCategories) {
            setShowMovieCategories(false);
        } else if (showSeriesCategories) {
          setShowSeriesCategories(false);
        }
        setShowAllChannels(true);
    }

    function handleMyChannelsClicked(event) {
      console.log(myChannels);

      showContent();

        if (activeNavLink) {
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        }

        if (showAllChannels) {
            setShowAllChannels(false)
        } else if (showMovieCategories) {
            setShowMovieCategories(false);
        } else if (showSeriesCategories) {
          setShowSeriesCategories(false);
        }
        setShowMyChannels(true);
    }

    function handleMovieCategoriesClicked(event) {
      // const link = document.getElementById('trending-movies-link');
      // console.log(link);
      // link.click();

      fetchTrendingMovies();

      showContent()

        if (activeNavLink) {
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        }


        if (showMyChannels) {
            setShowMyChannels(false)
        } else if (showAllChannels) {
            setShowAllChannels(false);
        } else if (showSeriesCategories) {
          setShowSeriesCategories(false);
        }
        setShowMovieCategories(true);
    }

    function handlesSeriesCategoriesClicked(event) {
      // const link = document.getElementById('trending-series-link');
      // console.log(link)
      // link.click();
      fetchTrendingSeries();

      showContent()

        if (activeNavLink) {
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
        }


        if (showMyChannels) {
            setShowMyChannels(false)
        } else if (showAllChannels) {
            setShowAllChannels(false);
        } else if (showMovieCategories) {
          setShowMovieCategories(false);
        }
        setShowSeriesCategories(true);
    }

    function showContent() {
      // for responsive nav on smaller screens, switch between nav and content views
      if (navElement) {
        navElement.classList.remove('active');
      }

      if (contentElement) {
        contentElement.classList.add('active')
      }
    }

    function hideContent() {
      contentElement.classList.remove('active');
      navElement.classList.add('active');
    }

    // SeriesCategories
    // const [seriesGenres, setSeriesGenres] = useState([]);

    const fetchSeriesGenres = () => {
        fetch('http://127.0.0.1:5000/api/series/genres', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (!data.error) {
              setSeriesGenres(data);
            }
        });
    }

    const fetchSeriesByGenre = (event) => {
        const genreId = event.target.id;
        console.log(event.target.textContent);
        // setPlaceholder(event.target.textContent);

        fetch(`http://127.0.0.1:5000/api/series/${genreId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(`Fetched series:`, data);
          if (!data.error) {
            setSeries(data);
          }
        })
    }

    const fetchTrendingSeries = () => {

      // setPlaceholder("Trending🔥");

      fetch(`http://127.0.0.1:5000/api/series/trending`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Fetched Trending series:`, data);
        if (!data.error) {
          setSeries(data);
        }
      })
  }

    const fetchMoviesGenres = () => {
      fetch('http://127.0.0.1:5000/api/movies/genres', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if (!data.error) {
            setMoviesGenres(data);
          }
      });
  }

  const fetchMoviesByGenre = (event) => {
      const genreId = event.target.id;
      console.log(event.target.textContent);
      // setPlaceholder(event.target.textContent);

      fetch(`http://127.0.0.1:5000/api/movies/${genreId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Fetched movies:`, data);
        if (!data.error) {
          setMovies(data);
        }
      })
  }

  const fetchTrendingMovies = () => {

    // setPlaceholder("Trending🔥");

    fetch(`http://127.0.0.1:5000/api/movies/trending`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(`Fetched Trending series:`, data);
      if (!data.error) {
        setMovies(data);
      }
    })
  }

  const chat = {
    total_users: '44',
    online_users: '4',
    title: 'From',
  }

    //

    return (
      <div className='container'>
        <div className="nav active">
          <div className="search-channels">
            <Search />
          </div>
          <div className="nav-channels">
            <div className="nav-channels-single">
              <a onClick={handleMyChannelsClicked} ref={linkRef} className='channels-navlink'>Your chats</a>
            </div>
            <div className="nav-channels-single">
              <a onClick={handleAllChannelsClicked} className='channels-navlink'>All chats</a>
            </div>
            <div className="nav-channels-single">
              <a onClick={handleMovieCategoriesClicked} className='channels-navlink'>Movies</a>
            </div>
            <div className="nav-channels-single">
              <a onClick={handlesSeriesCategoriesClicked} className='channels-navlink'>Series</a>
            </div>
          </div>
          {/* place channels or movie categories here based on navigation link visited */}
          {showMyChannels && <MyChannels />}
          {showAllChannels && <AllChannels />}
          {showMovieCategories && (
            <div className="movie-categories">
                {/* movies genres */}
                <div className="movie-category" onClick={fetchTrendingMovies} id="trending-movies-link">
                      Trending🔥
                </div>
                {moviesGenres && (moviesGenres.map((genre) => (
                    <div className="movie-category" id={genre.id} key={genre.id} onClick={fetchMoviesByGenre}>
                        {genre.name}
                    </div>
                )))}
            </div> 
          )}

          {/* {showSeriesCategories && <SeriesCategories />} */}
          {showSeriesCategories && (
            <div className="movie-categories">
                {/* Series genres */}
                <div className="movie-category" onClick={fetchTrendingSeries} id="trending-series-link">
                      Trending🔥
                </div>
                {seriesGenres && (seriesGenres.map((genre) => (
                    <div className="movie-category" id={genre.id} key={genre.id} onClick={fetchSeriesByGenre}>
                        {genre.name}
                    </div>
                )))}
            </div>
          )}

        </div>
        <div className="content">
          {showMovieCategories && <MovieList movies={movies}/>}
          {showSeriesCategories && <SeriesList series={series} />}
          {(showMyChannels || showAllChannels) && <Chat chat={chat}/>}
        </div>
      </div>
    );
}

export default Nav;