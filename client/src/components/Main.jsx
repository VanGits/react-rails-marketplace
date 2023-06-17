import React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Main.css"
import { useNavigate } from 'react-router-dom';

const Main = ({ items }) => {

    const navigate = useNavigate()

    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`)
    }

    const displayItem = Array.isArray(items) ? (
        items.map((item) => (
            <div className='display-item' onClick={() => handleItemClick(item.id)}>
                <img src={item.image_url} alt="" />
            </div>
        ))
    ) : null;
    return (
        <div className='Main'>
            {items.length > 0 && items ? <div className='display-items-wrapper'> {displayItem} </div> : <ImSpinner8 className='load' />}
        </div>
    );
}

export default Main;
