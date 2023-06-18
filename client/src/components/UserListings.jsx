import React, { useEffect, useState } from 'react';
import "../styles/UserListings.css"
import ListingModal from './modals/ListingModal';
import { IoMdAddCircle } from 'react-icons/io';
import { ImSpinner8 } from 'react-icons/im';

const UserListings = ({ userListings, isModalOpen, setIsModalOpen }) => {
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

                </div>
            </div>
        );
    });

    return (
        <div className='user-listings'>
            <div className="new-listing">
                <h1 onClick={handleClick}><IoMdAddCircle /></h1>
                <h2>Add new listing!</h2>
            </div>
            {isLoading ? (
                <ImSpinner8 className='load' />
            ) : (
                <>
                    {userListing.length > 0 ? userListing : <h1>No listings yet!</h1>}
                    <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </>
            )}
        </div>
    );
}

export default UserListings;