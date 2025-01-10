// Navigation
// import { NavLink } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import Channel from "./Channel";
import AllChannels from './AllChannels.jsx';
import MovieList from './MovieList';
import Chat from './Chat';
import SeriesList from './SeriesList';
import useGetAllChannels from '../hooks/useGetAllChannels';
import useGetUserChannels from '../hooks/useGetUserChannels.js';
import useChannels from '../z-store/useChannels';
// import SyncLoader from "react-spinners/SyncLoader";
import MovieModal from './MovieModal';
import SeriesModal from './SeriesModal';
import LoadingSpinner from "./LoadingSpinner";
import JoinChannelDefaultScreen from "./JoinChannelDefaultScreen";
import NoChatSelected from "./NoChatSelected";
import useGetJoinedChannels from "../hooks/useGetJoinedChannels";
import useGetCreatedChannels from "../hooks/useGetCreatedChannels";
import backArrow from "../assets/images/back-arrow.png"
import useSearchChannels from "../hooks/useSearchChannels";
import useSearchMovies from "../hooks/useSearchMovies";
import useSearchSeries from "../hooks/useSearchSeries";

function Home() {
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
    const { loading: allChannelsLoading, channels: allChannels, setChannels: setAllChannels } = useGetAllChannels();
    const { loading: myChannelsLoading, channels: myChannels, setChannels: setUserChannels } = useGetUserChannels();
    const { selectedChannel } = useChannels();
    const { joinedChannels }  = useGetJoinedChannels();
    const { createdChannels } = useGetCreatedChannels();
    const [searchChannelFlag, setSearchChanneFlag] = useState('joined');
    const [searchGenreId, setSearchGenreId] = useState(null);
    const [searchPlaceholderGenre, setSearchPlaceholderGenre] = useState('');
    const [searchChannelIsDisabled, setSearchChannelIsDisabled] = useState(false);
    const [query, setChannelsQuery] = useState("");
    const [movieQuery, setMoviesQuery] = useState("");
    const [seriesQuery, setSeriesQuery] = useState("");
    const { loading: channelsSearchLoading, search } = useSearchChannels();
    const { loading: movieSearchLoading, searchMoviesFn } = useSearchMovies();
    const { loading: seriesSearchLoading, searchSeriesFn } = useSearchSeries();

    // const [placeholder, setPlaceholder] = useState("Trending🔥"); // placeholder for <Search /> component, to change with genres

    const navElement = document.getElementsByClassName('nav')[0];
    const contentElement = document.getElementsByClassName('content')[0];

    const goBack = () => {
      if (contentElement.classList.contains('active')) {
          contentElement.classList.remove('active');
      }
      if (!navElement.classList.contains('active')) {
          navElement.classList.add('active');
      }
  }

    useEffect(() => {
      if (linkRef.current) {
        // click first nav link (show my chats first / on reload )
        linkRef.current.click();
        // console.log('triggering first nav click');
      }
    }, []);

    useEffect(() => {
      fetchSeriesGenres();
      fetchMoviesGenres();
    }, []);

    function handleAllChannelsClicked(event) {
      // console.log(allChannels)
      if (searchChannelIsDisabled) {
        setSearchChannelIsDisabled(false)
      }
      showContent();
      setSearchChanneFlag('all')

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
      // console.log(myChannels);
      if (searchChannelIsDisabled) {
        setSearchChannelIsDisabled(false)
      }
      showContent();
      setSearchChanneFlag('joined')

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
      setSearchChannelIsDisabled(true)
      fetchTrendingMovies();
      // getMoviesChannelIds();
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
      setSearchChannelIsDisabled(true)
      fetchTrendingSeries();
      // getSeriesChannelIds();

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
            // console.log(data);
            if (!data.error) {
              setSeriesGenres(data);
            }
        })
    }

    const fetchSeriesByGenre = (genre) => {

        setIsLoading(true);
        setSearchGenreId(genre.id)
        setSearchPlaceholderGenre(genre.name)

        fetch(`/api/series/${genre.id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log(`Fetched series:`, data);
          if (!data.error) {
            setSeries(data);
          }
        })
        .finally(() => setIsLoading(false))
    }

    const fetchTrendingSeries = () => {

      setIsLoading(true);
      setSearchPlaceholderGenre('Trending🔥')

      fetch(`/api/series/trending`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(`Fetched Trending series:`, data);
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
          // console.log(data);
          if (!data.error) {
            setMoviesGenres(data);
          }
      })
  }

  const fetchMoviesByGenre = (genre) => {
      setIsLoading(true);
      setSearchGenreId(genre.id)
      setSearchPlaceholderGenre(genre.name)

      fetch(`/api/movies/${genre.id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setMovies(data);
        }
      })
      .finally(() => setIsLoading(false))
  }

  const fetchTrendingMovies = () => {

    setIsLoading(true);
    setSearchPlaceholderGenre('Trending🔥')

    fetch(`/api/movies/trending`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        setMovies(data);
      }
    })
    .finally(() => setIsLoading(false))
  }

  const handleChannelsInputChange = (e) => {
    const value = e.target.value;
    setChannelsQuery(value);
    }

  function searchChannels (event){
    if (event.key === 'Enter') {
      console.log('searching channels')
      console.log(searchChannelFlag)

      if (searchChannelFlag === 'joined') {
        search(query, searchChannelFlag, setUserChannels)
      } else if (searchChannelFlag === 'all') {
        search(query, searchChannelFlag, setAllChannels)
      }

    }
  }

  const handleMoviesInputChange = (e) => {
    const value = e.target.value;
    setMoviesQuery(value)
  }

  function searchMovies (event) {
    if (event.key === 'Enter') {
      console.log('searching movies')
      console.log(movieQuery)
      searchMoviesFn(movieQuery, searchGenreId, setMovies)
    }
  }

  const handleSeriesInputChange = (e) => {
    const value = e.target.value;
    setSeriesQuery(value)
  }

  function searchSeries (event) {
    if (event.key === 'Enter') {
      console.log('searching series')
      console.log(seriesQuery)
      searchSeriesFn(seriesQuery, searchGenreId, setSeries)
    }
  }

    return (
      <div className="container">
        <div className="nav active">
          <div className="search-channels">
            <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                <g>
                    <path
                        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                    ></path>
                </g>
                </svg>
                <input
                    id="query"
                    className="input"
                    type="search"
                    placeholder='Search channels'
                    name="searchbar"
                    disabled={searchChannelIsDisabled}
                    value={query}
                    onChange={handleChannelsInputChange}
                    onKeyDown={searchChannels}
                />
            </div>
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
          {/* {showMyChannels && <MyChannels channels={myChannels} loading={myChannelsLoading} />} */}
          {showMyChannels && (
            <div className="list-channels">
              {myChannelsLoading || !myChannels ? (<LoadingSpinner />) : myChannels.map((channel) => (
                <Channel channel={channel} key={channel._id}/>  
              ))}
            </div>
          )}
          {showAllChannels && <AllChannels channels={allChannels} loading={allChannelsLoading} />}
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
                    onClick={() => fetchMoviesByGenre(genre)}
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
                    onClick={() => fetchSeriesByGenre(genre)}
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
              <MovieModal />
              {/* <ContentHeader /> */}
              <div className="movie-list-header">
                  <div className="back-arrow-content">
                      <img src={backArrow} alt='back'className='back-arrow-icon' onClick={goBack}/>
                  </div>
                  <div className="search-content">
                      <div className="group">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                          <g>
                              <path
                                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                              ></path>
                          </g>
                          </svg>
                          <input
                              id="query"
                              className="input"
                              type="search"
                              placeholder={`Search ${searchPlaceholderGenre.toLowerCase()} series`}
                              name="searchbar"
                              value={movieQuery}
                              onChange={handleMoviesInputChange}
                              onKeyDown={searchMovies}
                          />
                      </div>
                  </div>
              </div>
              <div>
                  {isLoading ? (<LoadingSpinner />) : (<MovieList movies={movies}/>)}
              </div>
          </div>
          )}

          {showSeriesCategories && (
            <div className="movie-list">
              <SeriesModal />
              {/* <ContentHeader /> */}
              <div className="movie-list-header">
                  <div className="back-arrow-content">
                      <img src={backArrow} alt='back'className='back-arrow-icon' onClick={goBack}/>
                  </div>
                  <div className="search-content">
                      <div className="group">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                          <g>
                              <path
                                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                              ></path>
                          </g>
                          </svg>
                          <input
                              id="query"
                              className="input"
                              type="search"
                              placeholder={`Search ${searchPlaceholderGenre.toLowerCase()} series`}
                              name="searchbar"
                              value={seriesQuery}
                              onChange={handleSeriesInputChange}
                              onKeyDown={searchSeries}
                          />
                      </div>
                  </div>
              </div>
              <div>
                {isLoading ? (<LoadingSpinner />) : (<SeriesList series={series} />)}
              </div> 
            </div>
          )}
          {showMyChannels && (selectedChannel ? <Chat chat={selectedChannel} /> : <NoChatSelected />)}
          {showAllChannels && <JoinChannelDefaultScreen />}
        </div>
      </div>
    );
}

export default Home;