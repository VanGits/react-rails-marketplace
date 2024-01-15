import React, { useEffect, useState } from 'react';
import '../../styles/General Components/SearchMain.css';
import { useNavigate } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import "../../styles/User Components/Offers.css"
const Offers = ({ userListings, userOffers }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const truncateTitle = (title, maxLength) => {
    if (title?.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/offers/${itemId}`);
  };
  const handleOfferClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    setIsLoading(true);

    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [userListings]);

  const displayUserOffers = userOffers?.map((offer) => {
    const truncatedTitle = truncateTitle(offer.item_listing?.title, 20);
    return (
      <div className="display-item" key={offer.id}>
        <div className="image-container" onClick={() => handleOfferClick(offer.item_listing?.id)}>
          <img src={offer.item_listing?.image_url} alt="" />
        </div>
        <div className="item-details-display">
          <div className="display-details">
            <p>{truncatedTitle}</p>
            <p>You have offered ${offer.price.toFixed(2)}</p>
            <h4>{offer.item_listing?.location}</h4>
          </div>
        </div>
      </div>
    )
  })



  const displayItem = userListings
    .filter(item => item.offers.length > 0)
    .map(item => {
      const truncatedTitle = truncateTitle(item.title, 20);
      
      return (
        <div className="display-item" key={item.id}>
          <div className="image-container" onClick={() => handleItemClick(item.id)}>
            <img src={item.image_url} alt="" />
          </div>
          <div className="item-details-display">
            <div className="display-details">
              <p>{truncatedTitle}</p>
              <p>${item.price.toFixed(2)}</p>
              <p className='totalUnreadLength' id='displayOffersLength'>{item.offers.length}</p>
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
      ) : userListings.length > 0 || userOffers?.length > 0? (
        <>
          <h1 id='offer-title'>Check your listings offers</h1>
          {userListings?.length > 0 ? <div className='display-items-wrapper'>{displayItem}</div> : 
          <p className='no-items'>No offers sent to you.</p>
    }
          {userOffers?.length > 0 ? <h1 className='no-items'>Offers you sent</h1> : ""}
          {userOffers?.length > 0 ? <div className='display-items-wrapper'>
            {displayUserOffers}
          </div> : <h1 className='no-items'>You haven't sent any offers.</h1>}

        </>

      ) : (
        <div className='no-items-wrapper'>
          <p className='no-items'>No offers sent to you.</p>
        </div>
      )}


    </div>

  );
};

export default Offers;
