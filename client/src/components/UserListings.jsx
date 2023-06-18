import React, { useEffect, useState } from 'react';
import "../styles/UserListings.css"
import ListingModal from './modals/ListingModal';
import { IoMdAddCircle } from 'react-icons/io';
const UserListings = ({userListings}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    function handleClick () {
        setIsModalOpen(!isModalOpen)
    }
   
    return (
        <div className='user-listings'>
            <div className="new-listing">
                <h1 onClick={handleClick}><IoMdAddCircle/></h1>
                <h2>Add new listing!</h2>
            </div>
            
            <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    );
}

export default UserListings;
