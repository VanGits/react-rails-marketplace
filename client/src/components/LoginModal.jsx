import React from 'react';
import "../styles/LoginModal.css"
import ReactModal from "react-modal";
const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <ReactModal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
            className="modal"
            overlayClassName="modal-overlay"

        >
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

                <h2 id='no-account'>Don't have an account? Sign Up</h2>
                <button>Log in</button>
            </form>

        </ReactModal>
    );
}

export default LoginModal;
