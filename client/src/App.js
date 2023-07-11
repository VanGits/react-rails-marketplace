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
import SearchMain from "./components/Searchmain";
import Favorites from "./components/Favorites";
import Offers from "./components/Offers";
import OfferDisplay from "./components/OfferDisplay";
import OfferModal from "./components/modals/OfferModal";




function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [userListings, setUserListings] = useState([])
  const [item, setItem] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [searchedItems, setSearchedItems] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [offerItemId, setOfferItemId] = useState(null)
  const [userOffers, setUserOffers] = useState([])


  const handleLogInModal = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }

  const handleOfferClick = (itemId) => {
    if (itemId) {
      setOfferItemId(itemId)
      setIsOfferModalOpen(true)
    }
  }
  
  useEffect(() => {
    fetch("/api/v1/item_listings")
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
        fetch("/api/v1/my-listings").then((res) => {
          if (res.ok) {
            res.json().then((listings) => setUserListings(listings));
          } 
        });
  }, [currentUser])

  useEffect(() => {
    fetch("/api/v1/favorites").then((res) => {
      if (res.ok) {
        res.json().then((favorites) => setBookmarkedItems(favorites));
      } 
    });
  }, [currentUser])

  useEffect(() => {
    fetch("/api/v1/offers").then((res) => {
      if (res.ok){
        res.json().then((offers) => setUserOffers(offers))
        
      }
    })
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
    
    fetch(`/api/v1/item_listings/${listingId}`, {
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

  const isItemBookmarked = (itemId) => {
    return bookmarkedItems.find((item) => item.id === itemId);
};

const toggleBookmark = (itemId) => {
    if (isItemBookmarked(itemId)) {
        removeBookmark(itemId);
    } else {
        addBookmark(itemId);
    }
};

const addBookmark = (itemId) => {
    // Perform a PATCH request to add the item to favorites
    fetch(`/api/v1/favorites/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
        .then((response) => {
            if (response.ok) {
                return response.json().then((newBookMarked) => {
                    setBookmarkedItems([...bookmarkedItems, newBookMarked]);
                    console.log("Item added to favorites.");
                });
            } else {
                return response.json().then((data) => {
                    toast.error(data.errors[0]);
                });
            }
        })
        .catch((error) => {
            console.error("Error adding item to favorites:", error);
        });
};

const removeBookmark = (itemId) => {
    // Perform a DELETE request to remove the item from favorites
    fetch(`/api/v1/favorites/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                setBookmarkedItems(bookmarkedItems.filter((item) => item.id !== itemId));
                console.log("Item removed from favorites.");
            } else {
                return response.json().then((data) => {
                    toast.error(data.errors[0]);
                });
            }
        })
        .catch((error) => {
            console.error("Error removing item from favorites:", error);
        });
};

// get total offers

const totalOffersLength = userListings.reduce((total, item) => {
  return total + item.offers.length;
}, 0);

const handleNewOfferFromUser = (offer) => {
    setUserOffers([...userOffers, offer])
}

  

  return (
    <> <h1 className="mobile">Mobile Responsiveness is still under construction, please view the app on desktop</h1>
    <div className="App">
      <ToastContainer />
     
      <UserContext.Provider value={currentUser}>
        <Routes>


          <Route path="/" element={
            <>
            
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              <Main isItemBookmarked={isItemBookmarked}toggleBookmark={toggleBookmark} addListing={addListing}items={items} isModalOpen={isModalOpen} setIsModalOpen= {setIsModalOpen} searchedItems= {searchedItems}/>
              <Footer/>
              </>} />
            
          <Route path="/item/:id" element={
            <>
              <div className="navigation">
                <Nav  totalOffersLength={totalOffersLength}setSearchedItems={setSearchedItems} handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              <ItemDisplay isItemBookmarked={isItemBookmarked}toggleBookmark={toggleBookmark}item={item} setItem={setItem} items = {items} updateListing={updateListing} handleOfferClick={handleOfferClick}/>
              <OfferModal isOfferModalOpen={isOfferModalOpen} setIsOfferModalOpen={setIsOfferModalOpen} offerItemId={offerItemId} handleNewOfferFromUser={handleNewOfferFromUser}/>
              <Footer/>
            </>} />
          <Route path="/user-listings" element={
            <>
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
            <Route path="/searchs?" element={
            <>
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              <SearchMain isItemBookmarked={isItemBookmarked}toggleBookmark={toggleBookmark}searchedItems={searchedItems} />
              <Footer/>
            </>} />
            <Route path="/user-favorites" element={
            <>
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              {currentUser && <Favorites isItemBookmarked={isItemBookmarked}toggleBookmark={toggleBookmark}bookmarkedItems={bookmarkedItems}/>}
              <Footer/>
            </>} />
            <Route path="/user-offers" element={
            <>
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              {currentUser && <Offers userListings={userListings} userOffers={userOffers} />}
              <Footer/>
            </>} />
            <Route path="/item/offers/:id" element={
            <>
              <div className="navigation">
                <Nav totalOffersLength={totalOffersLength}handleLogInModal={handleLogInModal}  handleProfileClick={handleProfileClick}  setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput = {searchInput}/>
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
              {currentUser && <OfferDisplay item={item} setItem={setItem} />}
              <Footer/>
            </>} />
            
        </Routes>
        </UserContext.Provider>
      
    </div>
    </>
  );
}

export default App;
