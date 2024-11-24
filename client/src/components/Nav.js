// Navigation

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import Channels from "./Channels";
import MovieCategories from "./MovieCategories.js";
import Search from "./Search";

function Nav() {
    const [value, setValue] = useState('');

    return (
        <div className="nav">
            <div className="search-channels">
                <Search />
            </div>
            <div className="nav-channels">
                <div className="nav-channels-single">
                    <a href="#">Your chats</a>
                    {/* <div className="active-nav-underline"></div> */}
                </div>
                <div className="nav-channels-single">
                    <a href="#">All chats</a>
                    {/* <div className="active-nav-underline"></div> */}
                </div>
                <div className="nav-channels-single">
                    <a href="#">Movie Categories</a>
                    <div className="active-nav-underline"></div> {/* Add underline to the active navigation (with some styling) */}
                </div>
            </div>
            {/* place channels or movie categories here based on navigation link visited */}
            {/* <Channels /> */}
            <MovieCategories />
        </div>
    )
}

export default Nav;