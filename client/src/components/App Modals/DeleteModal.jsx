import React from 'react';
import "../../styles/App Modals/DeleteModal.css"
import ReactModal from "react-modal";
const DeleteModal = ({ isModalDeleteOpen, setIsModalDeleteOpen, itemUserId, listingId, deleteListing }) => {
   
    const handleClick = () => {
        deleteListing(itemUserId, listingId)
        setIsModalDeleteOpen(false)
    }

    const handleClickNo = () => {
        setIsModalDeleteOpen(!isModalDeleteOpen)
    }
    
    return (
       
            <ReactModal
                isOpen={isModalDeleteOpen}
                onRequestClose={() => setIsModalDeleteOpen(false)}
                className="modal-delete"
                overlayClassName="modal-overlay">
                <h2>Are you sure you want to delete this?</h2>
                <button className='modal-delete-btn' id='yes' onClick={handleClick}>Yes, delete it.</button>
                <button className='modal-delete-btn' id='no' onClick={handleClickNo}>No</button>
            </ReactModal>

      

    );
}

export default DeleteModal;
