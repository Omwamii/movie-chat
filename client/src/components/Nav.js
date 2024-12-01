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

    useEffect(() => {
      if (linkRef.current) {
        // click first nav link (show my chats first / on reload )
        linkRef.current.click();
        console.log('triggering first nav click');
      }
    }, []);

    function handleAllChannelsClicked(event) {
        console.log('All clicked');
        if (activeNavLink) {
            console.log(`Then: ${activeNavLink}`)
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
            console.log(event.target)
        } else {
            console.log(event.target)
            console.log(event.target.classList)
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
        }

        if (showMyChannels) {
            setShowMyChannels(false)
        } else if (showMovieCategories) {
            setShowMovieCategories(false);
        }
        setShowAllChannels(true);
    }

    function handleMyChannelsClicked(event) {
        console.log('My clicked');
        if (activeNavLink) {
            console.log(`Then: ${activeNavLink}`)
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
        }


        if (showAllChannels) {
            setShowAllChannels(false)
        } else if (showMovieCategories) {
            setShowMovieCategories(false);
        }
        setShowMyChannels(true);
    }

    function handleMovieCategoriesClicked(event) {
        console.log('Movies clicked');
        if (activeNavLink) {
            console.log(`Then: ${activeNavLink}`)
            activeNavLink.classList.remove('active');
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
        } else {
            event.target.classList.add('active');
            setActiveNavLink(event.target);
            console.log(`Now: ${activeNavLink}`);
        }


        if (showMyChannels) {
            setShowMyChannels(false)
        } else if (showAllChannels) {
            setShowAllChannels(false);
        }
        setShowMovieCategories(true);
    }

    return (
      <div className='container'>
        <div className="nav">
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
              <a onClick={handleMovieCategoriesClicked} className='channels-navlink'>Categories</a>
            </div>
          </div>
          {/* place channels or movie categories here based on navigation link visited */}
          {showMyChannels && <MyChannels />}
          {showAllChannels && <AllChannels />}
          {showMovieCategories && <MovieCategories />}
        </div>
        {showMovieCategories && <MovieList />}
        {(showMyChannels || showAllChannels) && <Chat />}
      </div>
    );
}

export default Nav;