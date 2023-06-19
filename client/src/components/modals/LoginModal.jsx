import React, { useEffect, useState } from 'react';
import '../../styles/modals/LoginModal.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactModal from 'react-modal';
import Autocomplete from 'react-google-autocomplete';
import { ImSpinner8 } from 'react-icons/im';

const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  onLogin,
  setIsProfileClicked,
}) => {
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoginModal(!isLoginModal);
  };

  useEffect(() => {
    const loadGoogleMapsPlacesAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        // API loaded successfully
      };
      script.onerror = () => {
        // API failed to load
        toast.error('Failed to load Google Maps Places API');
      };
      document.body.appendChild(script);
    };

    loadGoogleMapsPlacesAPI();
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        image_url: image,
        location: location,
        password: password,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          setIsLoginModalOpen(false);
          setIsProfileClicked(false);
          toast.success('Signed up successfully!');
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => toast.error(err.errors && err.errors[0]));
        }
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          setIsLoginModalOpen(false);
          setIsProfileClicked(false);
          toast.success('Logged in successfully!');
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => toast.error(err.errors && err.errors));
        }
      });
  };

  const loginModal = (
    <>
      <div className="login-details">
        <h1>Log in</h1>
        <h2 onClick={() => setIsLoginModalOpen(false)}>Cancel</h2>
      </div>
      <h1 id="logo">MarketPlace</h1>
      <form action="" onSubmit={handleLogIn}>
        <div className="inputs">
          <h4>Username</h4>
          <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inputs">
          <h4>Password</h4>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <h2 id="no-account" onClick={handleClick}>
          Don't have an account? Sign Up
        </h2>
        <button disabled={isLoading}>{isLoading ? <ImSpinner8 className='loading'/> : 'Log in'}</button>
      </form>
    </>
  );

  const signUpModal = (
    <>
      <div className="login-details">
        <h1>Sign up</h1>
        <h2 onClick={() => setIsLoginModalOpen(false)}>Cancel</h2>
      </div>
      <h1 id="logo">MarketPlace</h1>
      <form onSubmit={handleSignUp}>
        <div className="inputs">
          <h4>Username</h4>
          <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inputs">
          <h4>Image Url</h4>
          <input type="text" placeholder="Enter an image url" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="inputs autocomplete">
          <h4>City</h4>
          <Autocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              setLocation(place.formatted_address);
            }}
            placeholder="Enter a city"
            types={['geocode']}
            componentRestrictions={{ country: 'us' }}
          />
        </div>
        <div className="inputs">
          <h4>Password</h4>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <h2 onClick={handleClick} id="no-account">
          Already have an account? Log in
        </h2>
        <button disabled={isLoading}>{isLoading ? <ImSpinner8 className='loading'/> : 'Sign Up'}</button>
      </form>
    </>
  );

  return (
    <ReactModal
      isOpen={isLoginModalOpen}
      onRequestClose={() => setIsLoginModalOpen(false)}
      className="modal"
      overlayClassName="modal-overlay"
    >
      {isLoginModal ? loginModal : signUpModal}
    </ReactModal>
  );
};

export default LoginModal;