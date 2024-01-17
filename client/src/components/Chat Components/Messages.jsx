import React, { useContext, useEffect, useState } from 'react';
import "../../styles/Chat Components/Messages.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Messages = ({ getRecipientId, getConvoId, getRecipientName }) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [messages, setMessages] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser) {
      fetch("/messages")
        .then(r => r.json())
        .then(messagesData => setMessages(messagesData))
    } else {
      navigate("/")
    }

  }, [currentUser])
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
    <div className='Messages'>
      <div className="messages-content">
        {messages && messages.length > 0 ? (
          messages.map((sentArray, arrayIndex) => (
            <div key={arrayIndex} className='message-noti' onClick={() => handleProfileClick(sentArray[0].sent_by.id, sentArray[0].sent_by.name)}>
              <p>{sentArray[0].sent_by?.name}</p>
              <img src={sentArray[0].sent_by?.image_url} alt="" />
            </div>
          ))
        ) : (
          <p className='no-item'>No messages found</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
