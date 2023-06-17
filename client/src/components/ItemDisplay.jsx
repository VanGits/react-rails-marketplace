import React, { useEffect, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import "../styles/ItemDisplay.css"

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

    return (
        <div className='item-display'>
            {isLoading ? (
                <ImSpinner8 className='load' />
            ) : (
                <div className={item ? "item-details-wrapper" : ""}>

                    {item && <img src={item.image_url} alt="" />}
                    <div className="item-details"> 
                        <div className="item-details-profile">


                            {item && <img src={item.user.image_url} alt="" />}
                            {item && <h3> by {item.user.name}</h3>}


                        </div>
                        <h2>{item && item.price}</h2>

                        <h1>{item && item.title}</h1>
                    </div>
                    {item ? "" : <h1 id='not-found'>Item not found</h1>}

                </div>

            )}
        </div>
    );
};

export default ItemDisplay;