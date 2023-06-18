import React, { useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Main.css"
import { useNavigate } from 'react-router-dom';


const Main = ({ items }) => {

    const navigate = useNavigate()
    

    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`)
    }

    const displayItem =  items.map((item) => {
        return (
            <div className='display-item' key={item.id}onClick={() => handleItemClick(item.id)}>
                <img src={item.image_url} alt="" />
                <h4>{item.location}</h4>
            </div>
        )
    })
    return (
        <div className='Main'>
            
            {items.length > 0 ? <div className='display-items-wrapper'> {displayItem} </div> : <ImSpinner8 className='load' />}
        </div>
    );
}

export default Main;
