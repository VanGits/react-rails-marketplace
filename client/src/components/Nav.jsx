import React, { useState } from 'react';
import "../styles/Nav.css"
import { AiOutlineHeart } from 'react-icons/ai';
import { GrTransaction } from 'react-icons/gr';
import { MdSell } from 'react-icons/md';


const Nav = ({handleLogIn}) => {
    
    return (
        <nav className='nav'>
            <div className="nav-wrapper">
                <div className="nav-logo-search">
                <h1 id='logo'>MarketPlace</h1>
                <input type="text" placeholder='Search'/>
                </div>
                
                <div className="nav-elements">

                    <span><AiOutlineHeart/><p> Saved</p></span>
                    <span><GrTransaction/><p>Transactions</p></span>
                    <span><MdSell/><p>My Listings</p></span>

                    <span onClick={handleLogIn}><p>Log in</p></span>

                </div>
                
            </div>
        </nav>
    );
}

export default Nav;
