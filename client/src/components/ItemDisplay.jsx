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

            fetch(`/items/${params.id}`)
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
                <div className="item-details-wrapper">

                    {item && <img src={item.image_url} alt="" />}
                    <div className="item-details">
                        <div className="item-details-profile">
                            <img src={item.users[0].image_url} alt="" />
                            <h3> by {item.users[0].name}</h3>
                        </div>

                        <h1>{item.name}</h1>
                    </div>

                </div>

            )}
        </div>
    );
};

export default ItemDisplay;