import React, { useEffect, useState } from 'react';
import '../styles/SearchMain.css';
import { useNavigate } from 'react-router-dom';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Offers.css"
const Offers = ({userListings}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
  
    const truncateTitle = (title, maxLength) => {
      if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
      }
      return title;
    };
  
    const handleItemClick = (itemId) => {
      navigate(`/item/offers/${itemId}`);
    };
  
    useEffect(() => {
      setIsLoading(true); 
  
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(delay);
    }, [userListings]); 
  
    const displayItem = userListings.map((item) => {
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
            
          </div>
        </div>
      );
    });
  
    return (
      <div className='Main'>
        {isLoading ? (
          <div className='no-items-wrapper'>
            <ImSpinner8 className='load' />
          </div>
        ) : userListings.length > 0 ? (
            <>
            <h1 id='offer-title'>Check your listings offers</h1>
            <div className='display-items-wrapper'>{displayItem}</div>
            </>
          
        ) : (
          <div className='no-items-wrapper'>
            <p className='no-items'>No items found</p>
          </div>
        )}
      </div>
    );
  };

export default Offers;
