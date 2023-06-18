import React, { useContext, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Main.css"
import { useNavigate } from 'react-router-dom';
import banner from "../assets/dollar.svg"
import UserContext from "../context/UserContext";
import ListingModal from './modals/ListingModal';
const Main = ({ items, isModalOpen, setIsModalOpen }) => {
    
    const navigate = useNavigate()
    const currentUser = useContext(UserContext);

    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`)
    }

    const displayItem =  items.map((item) => {
        return (
            <div className='display-item' key={item.id}onClick={() => handleItemClick(item.id)}>
                <div className="image-container">
                <img src={item.image_url} alt="" />
                    </div>
                <p>${item.price}</p>
                <h4>{item.location}</h4>
            </div>
        )
    })

    const handleClick = () => {
        setIsModalOpen(!isModalOpen)
    }
    return (
        <div className='Main'>
            <div className="main-banner">
                <img src={banner} alt="" />
                {currentUser &&<button className='list-btn' onClick={handleClick}>List an item now!</button>}
            </div>
            {items.length > 0 ? <div className='display-items-wrapper'> {displayItem} </div> : <ImSpinner8 className='load' />}
            <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
}

export default Main;
