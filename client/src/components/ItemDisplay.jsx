import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import "../styles/ItemDisplay.css"
import { BsBookmark } from 'react-icons/bs';


const ItemDisplay = () => {
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchItem = () => {
            setIsLoading(true);

            fetch(`/item_listings/${params.id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Error retrieving item data.');
                    }
                })
                .then(itemData => {
                    setTimeout(() => {
                        setItem(itemData);
                        setIsLoading(false);
                    }, 1000);
                })
                .catch(error => {
                    console.log('Error fetching item:', error);
                });
        };

        fetchItem();
    }, [params.id]);

    // Get date when item was posted

    const dateString = item && item.created_at;
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    

    return (
        <div className='item-display'>
            {isLoading ? (
                <ImSpinner8 className='load' />
            ) : (<div className='item-viewer'>
                <div className={item ? "item-details-wrapper" : ""}>
                     <div className="item-details">
                        <div className="item-details-profile">


                            {item && <img src={item.user.image_url} alt="" />}
                            {item && <h3> {item.user.name}</h3>}


                        </div>
                        <h1 className='title'>{item && item.title}</h1>
                        <h2 className='price'>${item && item.price.toFixed(2)}</h2>
                        
                        <h4>Posted at {formattedDate}</h4>
                        <span><BsBookmark/><h4>Favorite</h4></span>
                        <button>Message</button>
                    </div>

                    {item && <img src={item.image_url} alt="" />}
                   
                    {item ? "" : <h1 id='not-found'>Item not found</h1>}

                </div>
                <div className="description-wrapper">
                    <h1>Description</h1>
                    <h3>{item.description}</h3>
                </div>
                </div>
            )}
        </div>
    );
};

export default ItemDisplay;