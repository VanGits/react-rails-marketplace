import { useEffect, useState } from "react";
import "../src/App.css"
import Nav from "./components/General Components/Nav";
import LoginModal from "./components/App Modals/LoginModal";
import Main from "./components/General Components/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// User Components
import Favorites from "./components/User Components/Favorites";
import ItemDisplay from "./components/Item Components/ItemDisplay";
import UserListings from "./components/User Components/UserListings";
import UserContext from "./context/UserContext";
import Offers from "./components/User Components/Offers";
import OfferDisplay from "./components/User Components/OfferDisplay";
// User Components

// Main Components
import Footer from "./components/General Components/Footer";
import SearchMain from "./components/General Components/SearchMain";
// Main Components

// Modals
import OfferModal from "./components/App Modals/OfferModal";
// Modals

// Chats
import Chat from "./components/Chat Components/Chat";
import Messages from "./components/Chat Components/Messages";
// Chats







function App({ cable }) {
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
  const [unreadMessages, setUnreadMessages] = useState(0);




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
      if (res.ok) {
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
    setUserListings([newListing, ...userListings])
    setItems([newListing, ...items])

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
        if (items && items.length > 0) {
          const filteredItems = items.filter(
            (item) => item.id !== listingId
          );
          setItems(filteredItems)
        }
        if (userListings && userListings.length > 0) {
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
  const [recipientId, setRecipientId] = useState(null)
  const getRecipientId = (id) => {
    setRecipientId(id);

    if (id !== null) {
      localStorage.setItem('recipientId', id);
    } else {
      localStorage.removeItem('recipientId');
    }
  };
  const [convoId, setConvoId] = useState(null)
  const getConvoId = (id) => {
    setConvoId(id)
    if (id !== null) {
      localStorage.setItem('convoId', id);
    } else {
      localStorage.removeItem('convoId');
    }
  }
  const [recipientName, setRecipientName] = useState("")
  const getRecipientName = (name) => {
    setRecipientName(name)

    if (name !== null) {
      localStorage.setItem('recipientName', name);
    } else {
      localStorage.removeItem('recipientName');
    }
  }
  const [senderId, setSenderId] = useState(null)
  useEffect(() => {
    // Get the recipientId from localStorage
    const storedRecipientId = localStorage.getItem('recipientId');
    const storedConvoId = localStorage.getItem('convoId');
    const storedRecipientName = localStorage.getItem('recipientName');

    // Set the recipientId state if it is not null
    if (storedRecipientId) {
      setRecipientId(storedRecipientId);
    }

    if (storedConvoId) {
      setConvoId(storedConvoId)
    }
    if (storedRecipientName) {
      setRecipientName(storedRecipientName)
    }


  }, []);





  return (

    <div className="App">
       <SkeletonTheme baseColor="#636363" highlightColor="#525252">
      <ToastContainer />

      <UserContext.Provider value={currentUser}>
       
        <Routes>


          <Route path="/" element={
            <>

              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <Main isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} addListing={addListing} items={items} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} searchedItems={searchedItems} />
              <Footer />
            </>} />

          <Route path="/item/:id" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} setSearchedItems={setSearchedItems} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <ItemDisplay getRecipientName={getRecipientName} getConvoId={getConvoId} getRecipientId={getRecipientId} isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} item={item} setItem={setItem} items={items} updateListing={updateListing} handleOfferClick={handleOfferClick} />
              <OfferModal isOfferModalOpen={isOfferModalOpen} setIsOfferModalOpen={setIsOfferModalOpen} offerItemId={offerItemId} handleNewOfferFromUser={handleNewOfferFromUser} />
              <Footer />
            </>} />
          <Route path="/user-listings" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              {currentUser && <UserListings userListings={userListings} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing={addListing} isModalDeleteOpen={isModalDeleteOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} deleteListing={deleteListing} />}
              <Footer />
            </>} />
          <Route path="/searchs?" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <SearchMain isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} searchedItems={searchedItems} />
              <Footer />
            </>} />
          <Route path="/user-favorites" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              {currentUser && <Favorites isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} bookmarkedItems={bookmarkedItems} />}
              <Footer />
            </>} />
          <Route path="/user-offers" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              {currentUser && <Offers userListings={userListings} userOffers={userOffers} />}
              <Footer />
            </>} />
          <Route path="/item/offers/:id" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>

              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              {currentUser && <OfferDisplay item={item} setItem={setItem} />}
              <Footer />

            </>} />
          <Route path="/chat/:id" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>
              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <Chat setUnreadMessages={setUnreadMessages} recipientName={recipientName} cable={cable} recipientId={recipientId} convoId={convoId} />

            </>} />
          <Route path="/user-messages" element={
            <>
              <div className="navigation">
                <Nav unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
                {isProfileClicked && currentUser && <div className="profile-pop-up">
                  <div className="profile-details">
                    <img src={currentUser && currentUser.image_url} alt="user" />
                    <div className="profile-texts">
                      <h1>{currentUser && currentUser.name}</h1>

                    </div>

                  </div>
                  <p onClick={handleLogOut}>Log out</p>

                </div>}
              </div>
              <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
              <Messages getRecipientId={getRecipientId} getConvoId={getConvoId} getRecipientName={getRecipientName} />

            </>} />

        </Routes>
        
      </UserContext.Provider>
      </SkeletonTheme>
    </div>

  );
}

export default App;
