import React, { useState } from 'react';
import "../styles/LoginModal.css"
import { ToastContainer, toast } from "react-toastify";
import ReactModal from "react-modal";
const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen, onLogin, setIsProfileClicked }) => {

    const [isLoginModal, setIsLoginModal] = useState(true)

    // Track signup inputs with state
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {
        setIsLoginModal(!isLoginModal)
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: name, 
            image_url: image, 
            password: password }),
        }).then((r) => {
          if (r.ok) {
            setIsLoginModalOpen(false)
            toast.success("Signed up successfully!")
            r.json().then((user) => onLogin(user));
           
          } else {
            r.json().then((err) => toast.error(err.errors && err.errors[0]));
          }
        });
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: name, 
            password: password }),
        }).then((r) => {
          if (r.ok) {
            setIsLoginModalOpen(false)
            setIsProfileClicked(false)
            toast.success("Logged in successfully!")
            r.json().then((user) => onLogin(user));
            
          } else {
            r.json().then((err) => toast.error(err.errors && err.errors));
          }
        });
    }

    

    const loginModal =
        <>
            <div className="login-details">
                <h1>Log in</h1>
                <h2 onClick={() => setIsLoginModalOpen(false)}>Cancel</h2>

            </div>
            <h1 id='logo'>MarketPlace</h1>

            <form action="" onSubmit={handleLogIn}>
                <div className="inputs">
                    <h4>Username</h4>
                    <input type="text"  onChange={(e) => setName(e.target.value)}/>

                </div>
                <div className="inputs">
                    <h4>Password</h4>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)}/>

                </div>

                <h2 id='no-account' onClick={handleClick}>Don't have an account? Sign Up</h2>
                <button>Log in</button>
            </form>
        </>
    const signUpModal = <>
         <div className="login-details">
                <h1>Sign up</h1>
                <h2 onClick={() => setIsLoginModalOpen(false)}>Cancel</h2>

            </div>
            <h1 id='logo'>MarketPlace</h1>
            <form onSubmit={handleSignUp}>
                <div className="inputs">
                    <h4>Username</h4>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>

                </div>
                <div className="inputs">
                    <h4>Image Url</h4>
                    <input type="text"  onChange={(e) => setImage(e.target.value)}/>

                </div>
                <div className="inputs">
                    <h4>Password</h4>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)}/>

                </div>
            

                <h2 onClick={handleClick} id='no-account'>Already have an account? Log in</h2>
                <button>Sign Up</button>
            </form>
       
    </>
    return (
        <ReactModal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
            className="modal"
            overlayClassName="modal-overlay">
            {isLoginModal? loginModal : signUpModal}
        </ReactModal>

    );
}

export default LoginModal;
