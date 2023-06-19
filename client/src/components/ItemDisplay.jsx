import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/ItemDisplay.css"
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import MapDisplay from './MapDisplay';
import UserContext from "../context/UserContext";
import { toast } from 'react-toastify';



const ItemDisplay = ({ items, item, setItem, updateListing, isItemBookmarked, toggleBookmark }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const params = useParams();

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const fetchItem = () => {
      setIsLoading(true);

      fetch(`/item_listings/${params.id}`)
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

  // Get date when item was posted

  const dateString = item && item.created_at;
  const date = new Date(dateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);


  // display recommended items 

  const recommendedItems = items
    .filter((i) => item && item.id !== i.id) // Filter the items array
    .map((i) => (



      <div className='display-item' key={i.id} >
        <div className="image-container" onClick={() => handleItemClick(i.id)}>
          <img src={i.image_url} alt="" />
        </div>
        <div className="item-details-display">
          <div className="display-details">
            <p>{i.title}</p>
            <p className='item-price'>${i.price.toFixed(2)}</p>
            <h4>{i.location}</h4>
          </div>

          

        </div>
      </div>





    ));
  const navigate = useNavigate()
  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`)
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(item && item.title);
    setEditedPrice(item && item.price.toFixed(2));
    setEditedDescription(item && item.description);
  };



  const handleSaveClick = (e) => {

    setIsEditing(false);
    e.preventDefault()
    fetch(`/item_listings/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...item,
        title: editedTitle,
        price: parseFloat(editedPrice),
        description: editedDescription
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((editedListing) => updateListing(editedListing));
        toast.success("Listing updated!");
      } else {
        r.json().then((err) => toast.error(err.errors && err.errors[0]));
      }
    });


  };


  return (
    <div className='item-display'>
      {isLoading ? (
        <ImSpinner8 className='load' />
      ) : (
        <div className='item-viewer'>
          <div className={item ? 'item-details-wrapper' : ''}>
            {currentUser && currentUser.id === item?.user.id ? (
              <FaUserEdit
                id='user-edit'
                onClick={isEditing ? handleSaveClick : handleEditClick}
              />
            ) : (
              ''
            )}
            {item && <img src={item.image_url} alt='' />}
            {item ? (
              ''
            ) : (
              <h1 id='not-found'>Item not found</h1>
            )}
            {item && (
              <div className='item-details'>
                <div className='item-details-profile'>
                  {item && <img src={item.user.image_url} alt='' />}
                  <div className='item-details-profile-elements'>
                    <h3>{item && item.user.name}</h3>
                    <h4>Posted at {formattedDate}</h4>
                  </div>
                </div>
                {isEditing ? (
                  <>
                    <input
                      type='text'
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <input
                      type='number'
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />

                    <button onClick={handleSaveClick}>Save</button>
                  </>
                ) : (
                  <>
                    <h2 className='title price'>{item && item.title}</h2>
                    <h2 className='price'>${item && item.price.toFixed(2)}</h2>
                    <span onClick={() => toggleBookmark(item.id)}>
                    {isItemBookmarked(item.id) ? <BsBookmarkFill /> : <BsBookmark />}
                      <h4>Favorite</h4>
                    </span>
                    <button>Message</button>
                  </>
                )}
              </div>
            )}
          </div>
          {item && (
            <div className='description-wrapper'>
              <h1>{item && 'Description'}</h1>
              {isEditing ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
              ) : (
                <h3>{item && item.description}</h3>
              )}
              {item && <MapDisplay item={item} />}
              {item && <h1>Other items</h1>}
            </div>
          )}
          <div className='display-items-wrapper'>{recommendedItems}</div>
        </div>
      )}
    </div>
  );
};

export default ItemDisplay;