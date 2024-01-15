import React, { useContext, useEffect, useRef, useState } from 'react';
import "../../styles/Chat Components/Chat.css"
import UserContext from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import { toast } from 'react-toastify';


const Chat = ({ setUnreadMessages ,cable, recipientId, convoId, recipientName }) => {
  const currentUser = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate()
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages arrive
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);
  const received = (message) => {
   
   
    setMessages(prevMessages => [...prevMessages, message])
 
      // Increment the unreadMessages state when a new message arrives
    if (!isCurrentUserMessage(message)) {
      setUnreadMessages(prevUnread => prevUnread + 1);
    }
    
    
  };
  
  const isCurrentUserMessage = (message) => {
    return message?.user?.id === currentUser?.id;
  };


  useEffect(() => {
    if (convoId) {
      fetch(`/conversations/${convoId}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 401) {
            // If unauthorized, navigate to the home page
            navigate('/'); 
            throw new Error('Unauthorized');
          } else {
            throw new Error('Request failed');
          }
        })
        .then(convData => setMessages(convData))
        .catch(error => {
          // Handle any other errors that occurred during the fetch process
          console.error(error);
        });
    }
  }, [currentUser?.id, convoId]);

  useEffect(() => {
    if (convoId && currentUser?.id) {
      // Create the subscription when the component mounts
      const subscription = cable.subscriptions.create(
        {
          channel: 'MessagesChannel',
          conversation_id: convoId
        },
        {
          received: received
        }
      );

      // Clean up the subscription when the component unmounts
      return () => {
        subscription.unsubscribe();
      };
    }
    console.log('WebSocket connection established.');
  }, [cable, convoId, currentUser]);

  
 
  const sendMessage = (e) => {
    e.preventDefault();
    if (!recipientId) {
      console.error("Recipient ID is missing!");
      return;
    }
  
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: message,
        recipient_id: parseInt(recipientId),
        user_id: currentUser.id,
        conversation_id: convoId
        
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
      .then(data => {
        if(messages.length === 0){
          setMessages([data])
        }
        setUnreadMessages(0);
  
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch process
       
        toast.error(error);
      });
  
    setMessage(""); // Clear the message input field after sending
  };

  return (
    <div className='Chat'>
      <div className="chat-content">

     
      <div className="messageHeader">
        <h1>Messages {recipientName ?  "with " + recipientName: ""}</h1>
        
      </div>
      <div className="messages" id="messages" ref={messagesContainerRef}>
        {messages?.map((message) => (
          <div className={`message ${isCurrentUserMessage(message) ? "currentUser" : "recipient"}`} key={message.id}>
            <div className="messageContent">
              <img src={message?.user?.image_url} alt="" />
              <p>{message.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="messageForm">
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            className='messageInput'
            value={message}
            name='message'
            placeholder='Write something'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='messageButton' type='submit'>
            <AiOutlineSend/>
          </button>
        </form>
      </div>
   
    </div>
    </div>
  );
}

export default Chat;