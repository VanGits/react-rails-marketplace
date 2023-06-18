import React, { useEffect, useState } from 'react';
import "../styles/UserListings.css"
import ListingModal from './modals/ListingModal';
import { IoMdAddCircle } from 'react-icons/io';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const UserListings = ({ userListings, isModalOpen, setIsModalOpen, addListing }) => {
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(() => {
        // Simulating API fetch delay
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(delay); // Cleanup function to clear the timeout on unmount
    }, []);

    const handleClick = () => {
        setIsModalOpen(!isModalOpen);
    };
    const navigate = useNavigate()
    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`)
    }




    const userListing = userListings.map((listing) => {
        const dateString = listing.created_at;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
     
        return (
            <div key={listing.id} className='user-listing'>
                <img src={listing.image_url} alt="" />
                
                <div className="user-listing-details">
                    <h1>{listing.title}</h1>
                    <h2>${listing.price}</h2>
                    <h3>{formattedDate}</h3>
                    <h4>{listing.description}</h4>
                    <button className='list-btn'>Edit listing</button>
                    <a onClick={() => handleItemClick(listing.id)}>View Listing</a>
                </div>
            </div>
        );
    });

    return (
        <div className={userListing.length > 0 ? 'user-listings': "no-listings"}>
            <div className="new-listing">
                <h1 onClick={handleClick}><IoMdAddCircle /></h1>
                <h2>Add new listing!</h2>
            </div>
            {isLoading ? (
                <ImSpinner8 className='load' />
            ) : (
                <>
                    {userListing.length > 0 ? userListing : <h1>No listings yet!</h1>}
                    <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing={addListing}/>
                </>
            )}
        </div>
    );
}

export default UserListings;