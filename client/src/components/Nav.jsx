import React, { useState } from 'react';
import "../styles/Nav.css"
import { AiOutlineHeart } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import { MdSell } from 'react-icons/md';


const Nav = ({ handleLogInModal, currentUser, handleProfileClick }) => {

    return (
        <nav className='nav'>
            <div className="nav-wrapper">
                <div className="nav-logo-search">
                    <h1 id='logo'>MarketPlace</h1>
                    <input type="text" placeholder='Search' />
                </div>

                {!currentUser ? <div className="nav-elements">
                <span ><p>Sell an item</p></span>
                    <span onClick={handleLogInModal}><p>Log in</p></span>
                </div> : <div className="nav-elements">
                    <span><AiOutlineHeart /><p> Saved</p></span>
                    <span><GrTransaction /><p>Transactions</p></span>
                    <span><MdSell /><p>My Listings</p></span>
                    <span id='profile'><img src={currentUser.image_url} alt="" onClick={handleProfileClick}/></span>
                </div>}

            </div>
        </nav>
    );
}

export default Nav;
