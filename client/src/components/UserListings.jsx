import React, { useEffect, useState } from 'react';
import "../styles/UserListings.css"
import ListingModal from './modals/ListingModal';
import { IoMdAddCircle } from 'react-icons/io';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import DeleteModal from './modals/DeleteModal';


const UserListings = ({ userListings, isModalOpen, setIsModalOpen, deleteListing, addListing, isModalDeleteOpen, setIsModalDeleteOpen }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [itemUserId, setItemUserId] = useState(null)
    const [listingId, setListingId] = useState(null)
  

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
        navigate(`/item/${itemId}`)
    }


    const handleDeleteModal = (userId, listingId) => {
        
        setIsModalDeleteOpen(!isModalDeleteOpen)
        setItemUserId(userId)
        setListingId(listingId)
        
    }



    const userListing = userListings.map((listing) => {
        const dateString = listing.created_at;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
     
        return (
            <div key={listing.id} className='user-listing'>
                <img src={listing.image_url} alt="" />
                
                <div className="user-listing-details">
                    <AiFillDelete id='delete-btn' onClick={() => handleDeleteModal(listing.user_id, listing.id)}/>
                    <h1>{listing.title}</h1>
                    <h1>${listing.price.toFixed(2)}</h1>
                    <h3>{formattedDate}</h3>
                    
                    <button className='list-btn'onClick={() => handleItemClick(listing.id)}>Edit listing</button>
                    
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
            <DeleteModal isModalDeleteOpen={isModalDeleteOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} handleItemClick={handleItemClick} itemUserId={itemUserId} listingId={listingId} deleteListing={deleteListing}/>
        </div>
    );
}

export default UserListings;