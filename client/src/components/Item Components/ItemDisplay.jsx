import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/Item Components/ItemDisplay.css"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import MapDisplay from './MapDisplay';
import UserContext from "../../context/UserContext";
import { toast } from 'react-toastify';



const ItemDisplay = ({ getRecipientName, getConvoId, getRecipientId, handleOfferClick, items, item, setItem, updateListing, isItemBookmarked, toggleBookmark }) => {

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

      fetch(`/api/v1/item_listings/${params.id}`)
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
            <p className='title-detail'>{i.title}</p>
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
    fetch(`/api/v1/item_listings/${item.id}`, {
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

  const handleProfileClick = (recipientId, recipientName) => {
    getRecipientId(recipientId)
    // Make a POST request to create a new conversation (message) with a new UUID
    fetch('/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient_id: recipientId,
        sender_id: currentUser.id
      })
    })
      .then(response => {
        if (response.ok) {
          // Request was successful, extract the generated UUID from the response data
          return response.json();
        } else {
          // Handle errors if needed
          throw new Error('Request failed');
        }
      })
      .then(convData => {

        getConvoId(convData.id)
        getRecipientName(recipientName)
        // Navigate to the new chat using the generated UUID
        navigate(`/chat/${convData.conversation_uuid}`);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch process
        console.error(error);
      });
  };


  return (
    <div className='item-display'>
      {isLoading ? (
        <ImSpinner8 className='load' />
      ) : (
        <div className='item-viewer'>
          <div className={item ? 'item-details-wrapper' : ''}>

            {item && <img id="product-img" src={item.image_url} alt='' />}
            {item ? (
              ''
            ) : (
              <h1 id='not-found'>Item not found</h1>
            )}
            {item && (
              <div className='item-details'>

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
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    ></textarea>

                    <button onClick={handleSaveClick}>Save</button>
                  </>
                ) : (
                  <>
                    <h2 className='title'>{item && item?.title}</h2>
                    <h2 className='price'>${item && item?.price?.toFixed(2)}</h2>

                    <div className='description-wrapper'>

                      <h3>{item && item.description}</h3>
                      <div className="map__container">
                        <MapDisplay item={item} />
                      </div>



                    </div>


                    <span onClick={() => toggleBookmark(item?.id)}>
                      {isItemBookmarked(item?.id) ? <IoMdHeart className="item-favorite" /> : <IoMdHeartEmpty className="item-favorite" />}

                    </span>
                    <div className="buttons">
                      {currentUser?.id !== item?.user?.id && currentUser && <button onClick={() => handleOfferClick(item.id)}>Offer Price</button>}
                      {currentUser?.id !== item?.user?.id && currentUser && <button onClick={() => handleProfileClick(item?.user?.id, item?.user?.name)}>Message</button>}
                    </div>

                  </>

                )}

                <div className='item-details-profile'>

                  {item && <img src={item?.user?.image_url} alt='' />}
                  <div className='item-details-profile-elements'>

                    <span> <p>Posted by </p><h3>{item && item?.user?.name}</h3></span>
                    <div className='date-posted'><MdOutlineDateRange id='date' /><h4>{formattedDate}</h4></div>
                    {currentUser && currentUser?.id === item?.user.id ? (
                      <button
                        id='user-edit'
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                      >Edit Post</button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Other recommended items */}
          <div className="display__items">


            {item && <h1>Other items</h1>}
            <p>Other items you might be interested in.</p>
            <div className='display-other-items-wrapper'>{recommendedItems}</div>

          </div>

        </div>
      )}
    </div>
  );
};

export default ItemDisplay;