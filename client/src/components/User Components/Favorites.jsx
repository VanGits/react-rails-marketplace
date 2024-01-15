
import "../../styles/User Components/Favorites.css"
import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
const Favorites = ({ bookmarkedItems, toggleBookmark, isItemBookmarked}) => {
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    setIsLoading(true); 

    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [bookmarkedItems]); 

  const displayItem = bookmarkedItems.map((item) => {
    const truncatedTitle = truncateTitle(item.title, 20);

    return (
      <div className='display-item' key={item.id}>
        <div className='image-container' onClick={() => handleItemClick(item.id)}>
          <img src={item.image_url} alt='' />
        </div>
        <div className='item-details-display'>
          <div className='display-details'>
            <p>{truncatedTitle}</p>
            <p>${item.price.toFixed(2)}</p>
            <h4>{item.location}</h4>
          </div>
          <div className='bookmark' onClick={() => toggleBookmark(item.id)}>
          {isItemBookmarked(item.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className='Main Favorites'>
        <h1>Your Favorites</h1>
      {isLoading ? (
        <div className='display__items'>
        <div className='display-items-wrapper'>
            {Array.from({ length: 8 }).map((_, index) => {
  
                return (
                    <div className='display-item' key={index}>
                        <div className="image-container">
                            {/* Add skeleton loading */}
                            {<Skeleton height={"100%"} />}

                        </div>
                        <div className="item-details-display">
                            <div className="display-details">
                                <p className='title-detail'><Skeleton height={"100%"} width={"100%"} /></p>
                                <p><Skeleton /></p>
                                <h4><Skeleton /></h4>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    </div>
      ) : bookmarkedItems.length > 0 ? (
        <div className='display-items-wrapper'>{displayItem}</div>
      ) : (
        <div className='no-items-wrapper'>
          <p className='no-items'>No favorites found</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
