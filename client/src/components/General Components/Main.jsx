import React, { useContext } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../../styles/General Components/Main.css";
import { useNavigate } from 'react-router-dom';
import banner from "../../assets/dollar2.svg";
import UserContext from "../../context/UserContext";
import ListingModal from '../Modals/ListingModal';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';

const Main = ({ items, isModalOpen, setIsModalOpen, addListing, toggleBookmark, isItemBookmarked }) => {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    

    const handleItemClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    
    
    const displayItem = items.map((item) => {
        const truncatedTitle = truncateTitle(item.title, 20);
        

        return (
            <div className='display-item' key={item.id}>
                <div className="image-container" onClick={() => handleItemClick(item.id)}>
                    <img src={item.image_url} alt="" />
                </div>
                <div className="item-details-display">
                    <div className="display-details">
                        <p>{truncatedTitle}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <h4>{item?.location}</h4>
                    </div>
                    <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
                        {isItemBookmarked(item.id) ? <BsBookmarkFill /> : <BsBookmark />}
                    </div>
                </div>
            </div>
        );
    });

    const handleClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='Main'>
            {banner && (
                <div className="main-banner">
                    <img src={banner} alt="" />
                    {currentUser && <button className='list-btn' onClick={handleClick}>List an item now!</button>}
                </div>
            )}
            {items.length > 0 ? (
                <div className='display-items-wrapper'>{displayItem}</div>
            ) : (
                <div className='no-items-wrapper'>
                    {items.length === 0 ? <ImSpinner8 className='load' />: <p className='no-items'>No items found</p> }
                </div>
            )}
            <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing={addListing} />
        </div>
    );
};

export default Main;