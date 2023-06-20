import React, { useState, useEffect } from 'react';
import '../styles/SearchMain.css';
import { useNavigate } from 'react-router-dom';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';

const SearchMain = ({ searchedItems, isItemBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true); // Set isLoading to true when the effect is triggered

    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchedItems]); // Add searchedItems to the dependency array

  const displayItem = searchedItems.map((item) => {
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
          <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
            {isItemBookmarked(item.id) ? <BsBookmarkFill /> : <BsBookmark />}
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
      ) : searchedItems.length > 0 ? (
        <div className='display-items-wrapper'>{displayItem}</div>
      ) : (
        <div className='no-items-wrapper'>
          <p className='no-items'>No items found</p>
        </div>
      )}
    </div>
  );
};

export default SearchMain;