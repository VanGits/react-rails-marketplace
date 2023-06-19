import { useEffect, useState } from "react";
import "../src/App.css"
import Nav from "./components/Nav";
import LoginModal from "./components/modals/LoginModal";
import Main from "./components/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import ItemDisplay from "./components/ItemDisplay";
import UserListings from "./components/UserListings";
import UserContext from "./context/UserContext";
import Footer from "./components/Footer";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [userListings, setUserListings] = useState([])
  const [item, setItem] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)


  const handleLogInModal = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }
  useEffect(() => {
    fetch("/item_listings")
      .then((r) => r.json())
      .then(itemsData => setItems(itemsData))
  }, [])


  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user));
      } else {
        toast.error("Please log in");
      }
    });
  }, []);

  useEffect(() => {
        fetch("/my-listings").then((res) => {
          if (res.ok) {
            res.json().then((listings) => setUserListings(listings));
          } 
        });
  }, [currentUser])

  

  const onLogin = (user) => {
    setCurrentUser(user)
  }

  const handleProfileClick = () => {
    setIsProfileClicked(!isProfileClicked)
  }




  const handleLogOut = (e) => {
    e.preventDefault()
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

    }).then((r) => {
      if (r.ok) {
        setCurrentUser(null)



      }
    });
  }
 
  // update state when changes to listings have been made

  const addListing = (newListing) => {
    setUserListings([ newListing, ...userListings])
    setItems([ newListing, ...items])
    
  }

  const updateListing = (editedListing) => {
    setItem(editedListing)
    const updatedListing = items.map((item) => {
      if (item.id === editedListing.id) {
        return { ...item, ...editedListing };
      } else {
        return item;
      }
    });
    setItems(updatedListing);
    
    const updatedUserListing = userListings.map((item) => {
      if (item.id === editedListing.id) {
        return { ...item, ...editedListing };
      } else {
        return item;
      }
    });
    setUserListings(updatedUserListing);
  }
 

  const deleteListing = (itemUserId, listingId) => {
    
    fetch(`/item_listings/${listingId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        if (items && items.length > 0){
          const filteredItems = items.filter(
            (item) => item.id !== listingId
          );
          setItems(filteredItems)
        }
        if (userListings && userListings.length > 0){
          const filteredUserListings = userListings.filter(
            (listing) => listing.id !== listingId
          )
          setUserListings(filteredUserListings)
        }
        toast.success("Listing deleted!")
      } else {
        r.json().then((err) => toast.error(err.error))
      }
    })
  }
  useEffect(() => {
    const handleClickOutsideProfilePopUp = (e) => {
      if (
        isProfileClicked &&
        !e.target.closest(".profile-pop-up") &&
        !e.target.closest("#profile")
      ) {
        setIsProfileClicked(false);
      }
    };
  
    window.addEventListener("click", handleClickOutsideProfilePopUp);
  
    return () => {
      window.removeEventListener("click", handleClickOutsideProfilePopUp);
    };
  }, [isProfileClicked]);

  const handleSearch = (searchQuery) => {
    fetch(`/item_listings?search=${searchQuery}`)
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      <UserContext.Provider value={currentUser}>
        <Routes>


          <Route path="/" element={
            <>
              <div className="navigation">
                <Nav handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} handleSearch = {handleSearch}/>
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>
                      <p>View Profile</p>
                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <Main items={items} isModalOpen={isModalOpen} setIsModalOpen= {setIsModalOpen}/>
              <Footer/>
              </>} />
            
          <Route path="/items/:id" element={
            <>
              <div className="navigation">
                <Nav handleLogInModal={handleLogInModal} currentUser={currentUser} handleProfileClick={handleProfileClick} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>
                      <p>View Profile</p>
                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <ItemDisplay item={item} setItem={setItem} items = {items} updateListing={updateListing}/>
              <Footer/>
            </>} />
          <Route path="/my-listings" element={
            <>
              <div className="navigation">
                <Nav handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>
                      <p>View Profile</p>
                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              {currentUser && <UserListings userListings={userListings} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing = {addListing} isModalDeleteOpen={isModalDeleteOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} deleteListing={deleteListing}/>}
              <Footer/>
            </>} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
