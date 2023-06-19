import React, { useContext, useState } from 'react';
import "../styles/Nav.css"
import { BsBookmark } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';
import { MdSell } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import UserContext from "../context/UserContext";

const Nav = ({ handleLogInModal, handleProfileClick, handleSearch }) => {
    const currentUser = useContext(UserContext);
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput);
        }
    };
    const handleSearchClick = () => {
        handleSearch(searchInput);
    }
    return (
        <nav className='nav'>
            <div className="nav-wrapper">
                <div className="nav-logo-search">
                    <Link to="/"><h1 id='logo'>MarketPlace</h1></Link>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchInput}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="search-icon-wrapper" onClick={handleSearchClick}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                        
                    </div>
                </div>

                {!currentUser ? <div className="nav-elements">
                    <span ><p>Sell an item</p></span>
                    <span onClick={handleLogInModal}><p>Log in</p></span>
                </div> : <div className="nav-elements">
                    <span><BsBookmark /><p> Favorites</p></span>
                    <span><GrTransaction /><p>Transactions</p></span>
                    <Link to="/my-listings"><span><MdSell /><p>My Listings</p></span></Link>
                    <span id='profile'><img src={currentUser.image_url} alt="" onClick={handleProfileClick} /></span>
                </div>}

            </div>
        </nav>
    );
}

export default Nav;
