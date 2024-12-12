// Navigation
import { NavLink } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Search from "./Search";
import MyChannels from "./MyChannels";
import AllChannels from './AllChannels';
import MovieCategories from "./MovieCategories.js";
import MovieList from './MovieList';
import Chat from './Chat';

function Nav() {
    const [value, setValue] = useState('');
    const [showMyChannels, setShowMyChannels] = useState(true);
    const [showAllChannels, setShowAllChannels] = useState(false);
    const [showMovieCategories, setShowMovieCategories] = useState(false);
    const [activeNavLink, setActiveNavLink] = useState(null);
    const linkRef = useRef(null);
    const navElement = document.getElementsByClassName('nav')[0];
    const contentElement = document.getElementsByClassName('content')[0];

    useEffect(() => {
      if (linkRef.current) {
        // click first nav link (show my chats first / on reload )
        linkRef.current.click();
        console.log('triggering first nav click');
      }
    }, []);

    function handleAllChannelsClicked(event) {
        
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
        }
        setShowAllChannels(true);
    }

    function handleMyChannelsClicked(event) {

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
        }
        setShowMyChannels(true);
    }

    function handleMovieCategoriesClicked(event) {
        
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
        }
        setShowMovieCategories(true);
    }

    function handlesSeriesCategoriesClicked(event) {
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
        }
        setShowMovieCategories(true);
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
          {showMovieCategories && <MovieCategories />}
        </div>
        <div className="content">
          {showMovieCategories && <MovieList />}
          {(showMyChannels || showAllChannels) && <Chat />}
        </div>
      </div>
    );
}

export default Nav;