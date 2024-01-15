import React, { useContext } from 'react';
import "../../styles/General Components/Nav.css"
import { IoMdHeartEmpty } from "react-icons/io";
import { GrTransaction } from 'react-icons/gr';
import { MdSell } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMessageDots } from 'react-icons/bi';
import cart from "../../assets/cart.png"

import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UserContext";

const Nav = ({unreadMessages, setUnreadMessages, handleLogInModal, handleProfileClick, setSearchedItems, searchInput, setSearchInput, totalOffersLength }) => {
    const currentUser = useContext(UserContext);


    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const navigate = useNavigate();
    const handleSearch = () => {
        const loweredSearchQuery = searchInput.toLowerCase();

        fetch(`/api/v1/item_listings?search=${loweredSearchQuery}`)
            .then((r) => r.json())
            .then((data) => {
                setSearchedItems(data);
                if (loweredSearchQuery) {
                    navigate(`/searchs?q=${loweredSearchQuery}`, { replace: true });
                } else {
                    navigate("/")
                }

            })
            .catch((error) => console.error(error));
    };


    return (
        <nav className='nav'>
            <div className="nav-wrapper">
                <div className="nav-logo-search">
                    <Link to="/"><img src={cart} alt="logo" /><h1 id='logo'><span>Go</span>Recycle</h1></Link>
                    
                </div>
                <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder='Search here...'
                            value={searchInput}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="search-icon-wrapper" onClick={handleSearch}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>

                {!currentUser ? (
                    <div className="nav-elements">
                        
                        <button onClick={handleLogInModal}>Log in</button>
                        <button onClick={handleLogInModal} id='sign__up'>Sign Up</button>
                    </div>
                ) : (
                    <div className="nav-elements">
                        <Link to="/user-messages"><span><BiMessageDots /><p>Messages</p>{unreadMessages > 0 && (
                            <div className="totalUnreadLength">
                                {unreadMessages}
                            </div>
                        )}</span></Link>
                        <Link to="/user-offers"><span className='nav-offers'><GrTransaction /><p>Offers</p></span></Link>
                        <Link to="/user-favorites"><span><IoMdHeartEmpty /><p> Liked</p></span></Link>
                        <Link to="/user-listings"><span><MdSell /><p>Listings</p></span></Link>
                        <span id='profile'><img src={currentUser.image_url} alt="profile" onClick={handleProfileClick} /></span>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;