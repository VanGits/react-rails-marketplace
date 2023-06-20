import React, { useContext, useState } from 'react';
import "../../styles/modals/OfferModal.css"
import ReactModal from 'react-modal';
import UserContext from "../../context/UserContext";
import { toast } from 'react-toastify';
const OfferModal = ({setIsOfferModalOpen, isOfferModalOpen, offerItemId}) => {

  
    const currentUser = useContext(UserContext);
    const [contact, setContact] = useState("")
    const [price, setPrice] = useState("")
    const handleOfferSubmit = (e) => {
        e.preventDefault();
        
    
        fetch(`/api/v1/offers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contact: contact,
            price: price,
            user_id: currentUser.id,
            item_listing_id: offerItemId
          }),
        })
          .then((r) => {
           
            if (r.ok) {
              setIsOfferModalOpen(false);
              
              toast.success('Offer submitted successfully!');
            //   r.json().then((newOffer) => console.log(newOffer));
            } else {
              r.json().then((err) => toast.error(err.error[0]));
            }
          });
      };
      
    return (
        <ReactModal
          isOpen={isOfferModalOpen}
          onRequestClose={() => setIsOfferModalOpen(false)}
          className="offer-modal modal"
          overlayClassName="modal-overlay"
        >
          <form onSubmit={handleOfferSubmit}>
          <div className="inputs">
                <h4>Price</h4>
                <input type="number"placeholder='Example: 20' onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="inputs">
                <h4>Contact Information</h4>
                <input type="text" placeholder='Example: xxx-xxx-xxxx or xx@xx.com'onChange={(e) => setContact(e.target.value)}/>
            </div>
            
            
            <button>Submit Offer</button>
          </form>
        </ReactModal>
      );
    };

export default OfferModal;
