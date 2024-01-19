import React from "react";
import "../../styles/Mobile Components/MobileOverlay.css"
import { useSelector } from "react-redux";
import { BiMessageDots } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdSell } from "react-icons/md";
import { Link } from "react-router-dom";
const MobileOverlay = ({ handleLogOut, isBurgerOpened, setIsBurgerOpened }) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    
    return(
        <div className={`MobileOverlay ${isBurgerOpened ? "show" : ""}`}>
            <div className="mobile__profile">
            <img src={currentUser?.image_url} alt="profile" />
            <h1>{currentUser?.name}</h1>
            </div>
            
            <Link to='/user-messages' onClick={() => setIsBurgerOpened(!isBurgerOpened)}><span className="mobile__items"><BiMessageDots /><p>Messages</p></span></Link>
            <Link to='/user-offers' onClick={() => setIsBurgerOpened(!isBurgerOpened)}><span className="mobile__items"><GrTransaction /><p>Offers</p></span></Link>
            <Link to='/user-favorites' onClick={() => setIsBurgerOpened(!isBurgerOpened)}><span className="mobile__items"><IoMdHeartEmpty /><p>Liked</p></span></Link>
            <Link to='/user-listings' onClick={() => setIsBurgerOpened(!isBurgerOpened)}><span className="mobile__items"><MdSell /><p>Listings</p></span></Link>
            <button onClick={handleLogOut}>Log Out</button>

        </div>
    )
}

export default MobileOverlay