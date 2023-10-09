import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/OfferDisplay.css"

import { toast } from 'react-toastify';
const OfferDisplay = ({item, setItem }) => {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    
    
  useEffect(() => {
    fetch(`/api/v1/my-listings/${params.id}`)
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("Unauthorized");
        }
      })
      .then(itemData => {
        setTimeout(() => {
          setItem(itemData);
          setIsLoading(false);
        }, 1000);
      })
  }, [params.id])

    const offer = item?.offers.map((offer) => {
        return (
            <div className='offer' key={offer.id}>
                <img src={offer.user_image_url} alt="" />
                <div className="offer-details">
                <h2>{offer.user_name}</h2>
                <p>${offer.price.toFixed(2)}</p>
                <p>Contact Info: {offer.contact}</p>
                </div>
               
            </div>
            
        )
    })
    
  return (
    <div className='item-display'>
      {isLoading ? (
        <ImSpinner8 className='load' />
      ) : (
        <div className='item-viewer'>
          <div className={item ? 'offer-details-wrapper' : ''}>
           
            {item && (
              <div className='item-details offer-details-item'>
                {item.offers.length > 0 && <div className='offer-details-image'>
                  {item && <img className="offer-img"src={item.image_url} alt='' />}
                  <div className='item-details-profile-elements'>
                    <h1>{item && item.title}</h1>
                    
                    
                  </div>
                 
                </div>}
                {item.offers.length > 0 ? 
                <div className="offers">
                    <h1>Offers:</h1>
                   
                 <div className='offers-wrapper'>{item && offer}</div>
                </div>: 
                <h1>No offers found for {item.title}!</h1>}
                
              </div>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
};


export default OfferDisplay;
