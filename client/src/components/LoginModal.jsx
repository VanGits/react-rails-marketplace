import React, { useState } from 'react';
import "../styles/LoginModal.css"
import ReactModal from "react-modal";
const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }) => {

    const [isLoginModal, setIsLoginModal] = useState(true)


    const handleClick = () => {
        setIsLoginModal(!isLoginModal)
    }

    const loginModal =
        <>
            <div className="login-details">
                <h1>Log in</h1>
                <h2 onClick={() => setIsLoginModalOpen(false)}>Cancel</h2>

            </div>
            <h1 id='logo'>MarketPlace</h1>

            <form action="">
                <div className="inputs">
                    <h4>Username</h4>
                    <input type="text" />

                </div>
                <div className="inputs">
                    <h4>Password</h4>
                    <input type="password" />

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
            <form action="">
                <div className="inputs">
                    <h4>Username</h4>
                    <input type="text" />

                </div>
                <div className="inputs">
                    <h4>Image Url</h4>
                    <input type="password" />

                </div>
                <div className="inputs">
                    <h4>Password</h4>
                    <input type="password" />

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
