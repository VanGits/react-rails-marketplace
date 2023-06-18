import React, { useState } from 'react';
import "../../styles/modals/ListingModal.css"
import ReactModal from "react-modal";
const ListingModal = ({isModalOpen, setIsModalOpen}) => {
    //attributes :id, :title, :description, :image_url, :location, :user_id, :price,
    
    return (
        <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal listing"
        overlayClassName="modal-overlay">
          
        <form action="">
            <div className="inputs">
                <h4>Title</h4>
                <input type="text" />
            </div>
           
            <div className="inputs">
                <h4>Listing Image URL</h4>
                <input type="text" />
            </div>
            <div className="inputs">
                <h4>Price</h4>
                <input type="number" />
            </div>
            <div className="inputs">
                <h4>Description</h4>
                <textarea name="" id="" ></textarea>
            </div>
            <button>Create new listing</button>
            
        </form>
       
      </ReactModal>
    );
}

export default ListingModal;
