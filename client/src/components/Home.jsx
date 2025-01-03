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
// import SyncLoader from "react-spinners/SyncLoader";
import useMovieModal from '../z-store/useMovieModal';
import MovieModal from './MovieModal';
import ContentHeader from './ContentHeader';
import SeriesModal from './SeriesModal';
import useSeriesModal from '../z-store/useSeriesModal';
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-hot-toast";

function Home() {
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
    const [isLoading, setIsLoading] = useState(false);
    const { loading: allChannelsLoading, allChannels } = useGetAllChannels();
    const { loading: myChannelsLoading, myChannels } = useGetUserChannels();
    const [seriesChannelsIds, setSeriesChannelsIds] = useState([]);
    const [movieChannelsIds, setmovieChannelsIds] = useState([]);

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
      getMoviesChannelIds();

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
      getSeriesChannelIds();

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
        fetch('/api/series/genres', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (!data.error) {
              setSeriesGenres(data);
            }
        })
    }

    const fetchSeriesByGenre = (event) => {
        const genreId = event.target.id;
        console.log(event.target.textContent);
        // setPlaceholder(event.target.textContent);

        setIsLoading(true);

        fetch(`/api/series/${genreId}`, {
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
        .finally(() => setIsLoading(false))
    }

    const fetchTrendingSeries = () => {

      // setPlaceholder("Trending🔥");
      setIsLoading(true);

      fetch(`/api/series/trending`, {
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
      .finally(() => setIsLoading(false))
  }

    const fetchMoviesGenres = () => {
      fetch('/api/movies/genres', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if (!data.error) {
            setMoviesGenres(data);
          }
      })
  }

  const fetchMoviesByGenre = (event) => {
      const genreId = event.target.id;
      console.log(event.target.textContent);
      // setPlaceholder(event.target.textContent);

      setIsLoading(true);

      fetch(`/api/movies/${genreId}`, {
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
      .finally(() => setIsLoading(false))
  }

  const fetchTrendingMovies = () => {

    // setPlaceholder("Trending🔥");

    setIsLoading(true);

    fetch(`/api/movies/trending`, {
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
    .finally(() => setIsLoading(false))
  }

  const chat = {
    total_users: '44',
    online_users: '4',
    title: 'From',
  }

  const getSeriesChannelIds = () => {
    fetch(`/api/channels/ids/series`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(`Fetched series ids:`, data);
      if (!data.error) {
        setSeriesChannelsIds(data)
      } else {
        toast.error(data.error)
      }
    })
  }

  const getMoviesChannelIds = () => {
    fetch(`/api/channels/ids/movie`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(`Fetched movies ids:`, data);
      if (!data.error) {
        console.log(data)
        setmovieChannelsIds(data)
      } else {
        toast.error(data.error)
      }
    })
  }

    return (
      <div className="container">
        <div className="nav active">
          <div className="search-channels">
            <Search />
          </div>
          <div className="nav-channels">
            <div className="nav-channels-single">
              <a
                onClick={handleMyChannelsClicked}
                ref={linkRef}
                className="channels-navlink"
              >
                Your chats
              </a>
            </div>
            <div className="nav-channels-single">
              <a
                onClick={handleAllChannelsClicked}
                className="channels-navlink"
              >
                All chats
              </a>
            </div>
            <div className="nav-channels-single">
              <a
                onClick={handleMovieCategoriesClicked}
                className="channels-navlink"
              >
                Movies
              </a>
            </div>
            <div className="nav-channels-single">
              <a
                onClick={handlesSeriesCategoriesClicked}
                className="channels-navlink"
              >
                Series
              </a>
            </div>
          </div>
          {/* place channels or movie categories here based on navigation link visited */}
          {showMyChannels && <MyChannels />}
          {showAllChannels && <AllChannels />}
          {showMovieCategories && (
            <div className="movie-categories">
              {/* movies genres */}
              <div
                className="movie-category"
                onClick={fetchTrendingMovies}
                id="trending-movies-link"
              >
                Trending🔥
              </div>
              {moviesGenres &&
                moviesGenres.map((genre) => (
                  <div
                    className="movie-category"
                    id={genre.id}
                    key={genre.id}
                    onClick={fetchMoviesByGenre}
                  >
                    {genre.name}
                  </div>
                ))}
            </div>
          )}

          {/* {showSeriesCategories && <SeriesCategories />} */}
          {showSeriesCategories && (
            <div className="movie-categories">
              {/* Series genres */}
              <div
                className="movie-category"
                onClick={fetchTrendingSeries}
                id="trending-series-link"
              >
                Trending🔥
              </div>
              {seriesGenres &&
                seriesGenres.map((genre) => (
                  <div
                    className="movie-category"
                    id={genre.id}
                    key={genre.id}
                    onClick={fetchSeriesByGenre}
                  >
                    {genre.name}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="content">
          {showMovieCategories && (
            <div className="movie-list">
              <MovieModal channels={movieChannelsIds} />
              <ContentHeader />
              <div>
                  {isLoading ? (<LoadingSpinner />) : (<MovieList movies={movies}/>)}
              </div>
          </div>
          )}

          {showSeriesCategories && (
            <div className="movie-list">
              <SeriesModal channels={seriesChannelsIds} />
              <ContentHeader />
              <div>
                {isLoading ? (<LoadingSpinner />) : (<SeriesList series={series} />)}
              </div>
            </div>
          )}
          {(showMyChannels || showAllChannels) && <Chat chat={chat} />}
        </div>
      </div>
    );
}

export default Home;