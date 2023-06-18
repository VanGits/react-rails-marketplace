import React, { useContext, useState } from 'react';
import "../../styles/modals/ListingModal.css"
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import UserContext from "../../context/UserContext";
const ListingModal = ({isModalOpen, setIsModalOpen, addListing}) => {
    //attributes :id, :title, :description, :image_url, :location, :user_id, :price,
    const currentUser = useContext(UserContext);
    // states to track inputs

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
   
  
   
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/item_listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            title: title,
            description: description,
            image_url: image,
            location: currentUser.location,
            price: price,
            user_id: currentUser.id
          }),
        })
          .then((r) => {
            if (r.ok) {
              return r.json(); 
            } else {
              return r.json().then((err) => {
                throw new Error(err.errors[0]);
              });
            }
          })
          .then((newListing) => {
            addListing(newListing);
            setIsModalOpen(false)
            toast.success("Listing created!");
            // navigate("/home");
          })
          .catch((error) => {
            console.error(error);
            toast.error(error.message);
          });
      };


    return (
        <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal listing"
        overlayClassName="modal-overlay">
          
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <h4>Title</h4>
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            </div>
           
            <div className="inputs">
                <h4>Listing Image URL</h4>
                <input type="text"onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="inputs">
                <h4>Price</h4>
                <input type="number" onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="inputs">
                <h4>Description</h4>
                <textarea name="" id="" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button>Create new listing</button>
            
        </form>
       
      </ReactModal>
    );
}

export default ListingModal;
