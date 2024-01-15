import React, { useContext, useState } from 'react';
import "../../styles/App Modals/ListingModal.css"
import ReactModal from "react-modal";
import { toast } from 'react-toastify';
import UserContext from "../../context/UserContext";
import { RxCross2 } from 'react-icons/rx';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';

const ListingModal = ({ isModalOpen, setIsModalOpen, addListing }) => {
  //attributes :id, :title, :description, :image_url, :location, :user_id, :price,
  const currentUser = useContext(UserContext);
  // states to track inputs

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    // Retrieve the selected file from the input element

    const file = event.target.files[0];
   
   
    // Update the state with the selected file
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', selectedFile);
    formData.append('location', currentUser?.location);
    formData.append('price', price);
    formData.append('user_id', currentUser.id);
  
    fetch("/api/v1/item_listings", {
      method: "POST",
      body: formData,
    })
      .then((r) => {
        if (r.ok) {
                return r.json();
              } else {
                return r.json().then((err) => {
                  throw new Error(err?.errors[0]);
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
              
              toast.error(error?.message);
            });
          };
    // fetch("/api/v1/item_listings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     image_url: selectedFile,
    //     location: currentUser.location,
    //     price: price,
    //     user_id: currentUser.id
    //   }),
    // })
    //   .then((r) => {
    //     if (r.ok) {
    //       return r.json();
    //     } else {
    //       return r.json().then((err) => {
    //         throw new Error(err.errors[0]);
    //       });
    //     }
    //   })
    //   .then((newListing) => {

    //     addListing(newListing);
    //     setIsModalOpen(false)
    //     toast.success("Listing created!");
    //     // navigate("/home");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     toast.error(error.message);
    //   });
  
  const handleUpload = (e) => {
    e.preventDefault()
    document.querySelector('input[type=file]').click()
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="modal listing"
      overlayClassName="modal-overlay">

      <form onSubmit={handleSubmit}>

        <div className="inputs">
          <RxCross2 id='exit-btn' onClick={() => setIsModalOpen(false)} />
          <h4>Title</h4>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* <div className="inputs">
          <h4>Listing Image URL</h4>
          <input type="text" onChange={(e) => setImage(e.target.value)} />
        </div> */}

        <div className="inputs">
          <h4>Price</h4>
          <input type="number" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <input id="input-file"type="file" name="image" accept="image/*"onChange={handleFileSelect} style={{ display: 'none' }} />
          <button id="upload-btn" onClick={(e) => handleUpload(e)}><BsFillCloudArrowUpFill id='cloud'/> Upload File</button>
          {selectedFile && <p>Selected File: {selectedFile.name}</p>}
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
