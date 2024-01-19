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
import ScrollToTop from "./components/Data Components/ScrollToTop";
import MobileOverlay from "./components/Mobile Components/MobileOverlay";
// Chats

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./state/user/userSlice";

function App({ cable }) {
 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [userListings, setUserListings] = useState([])
  const [item, setItem] = useState(null)
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
  const [itemsPopular, setItemsPopular] = useState([])
  const [itemsCheapest, setItemsCheapest] = useState([])
  const [isBurgerOpened, setIsBurgerOpened] = useState(false)
  const [convoId, setConvoId] = useState(null)
  const [recipientName, setRecipientName] = useState("")
  const [recipientId, setRecipientId] = useState(null)

  // Redux states
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  // Handles mobile burger button when clicked
  const handleBurgerClick = () => {
    setIsBurgerOpened(!isBurgerOpened)
  }
  // Handles log in button in Nav - shows the modal if true
  const handleLogInModal = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }
  // Handles offer button when clicked, it will receive the item id and shows modal
  const handleOfferClick = (itemId) => {
    if (itemId) {
      setOfferItemId(itemId)
      setIsOfferModalOpen(true)
    }
  }
  // Fetches all the item listings from the back end
  useEffect(() => {
    fetch("/api/v1/item_listings")
      .then((r) => r.json())
      .then(itemsData => setItems(itemsData))
  }, [])
  // Fetches the top 4 most expensive listings
  useEffect(() => {
    fetch("/api/v1/trending-four")
      .then((r) => r.json())
      .then(itemsData => setItemsPopular(itemsData))
  }, [])
  // Fetches the top 4 most cheapest listings
  useEffect(() => {
    fetch("/api/v1/cheapest-four")
      .then((r) => r.json())
      .then(itemsData => setItemsCheapest(itemsData))
  }, [])
  // Fetches if theres a currentUser or not
  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => dispatch(setCurrentUser(user)));
      } else {
        toast.error("Please log in");
      }
    });
  }, []);
  // Fetches the user's listings
  useEffect(() => {
    fetch("/api/v1/my-listings").then((res) => {
      if (res.ok) {
        res.json().then((listings) => setUserListings(listings));
      }
    });
  }, [currentUser])
  // Fetches the user's favorites
  useEffect(() => {
    fetch("/api/v1/favorites").then((res) => {
      if (res.ok) {
        res.json().then((favorites) => setBookmarkedItems(favorites));
      }
    });
  }, [currentUser])
  // Fetches the user's offers
  useEffect(() => {
    fetch("/api/v1/offers").then((res) => {
      if (res.ok) {
        res.json().then((offers) => setUserOffers(offers))

      }
    })
  }, [currentUser])
  // Function that handles log in when successful, setting it up with redux state
  const onLogin = (user) => {
    dispatch(setCurrentUser(user))
  }
  // Handles mouse click from user's profile, showing a box
  const handleProfileClick = () => {
    setIsProfileClicked(!isProfileClicked)
  }
  // Handles user's log out
  const handleLogOut = (e) => {
    e.preventDefault()
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        // Closes mobile overlay when logged out
        setIsBurgerOpened(false)
        // Sets current user to null
        dispatch(setCurrentUser(null))
        

      }
    });
  }
  // Adds listing with state
  const addListing = (newListing) => {
    setUserListings([newListing, ...userListings])
    setItems([newListing, ...items])

  }
  // Update listing with state
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
    // Also update it in the user's side
    const updatedUserListing = userListings.map((item) => {
      if (item.id === editedListing.id) {
        return { ...item, ...editedListing };
      } else {
        return item;
      }
    });
    setUserListings(updatedUserListing);
  }
  // Delete an item
  const deleteListing = (listingId) => {
    fetch(`/api/v1/item_listings/${listingId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        if (items && items.length > 0) {
          // Also delete it with state
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
  // Handles profile box, if clicked outside it removes itself.
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

  // This checks if the item is bookmarked.
  const isItemBookmarked = (itemId) => {
    return bookmarkedItems.find((item) => item.id === itemId);
  };
  // Toggles bookmark on and off
  const toggleBookmark = (itemId) => {
    if (isItemBookmarked(itemId)) {
      removeBookmark(itemId);
    } else {
      addBookmark(itemId);
    }
  };
  // Adds bookmark
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
  // Removes bookmark
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
  // Returns the total amount of offers in an item
  const totalOffersLength = userListings.reduce((total, item) => {
    return total + item.offers.length;
  }, 0);
  // Handles state if theres a new offer
  const handleNewOfferFromUser = (offer) => {
    setUserOffers([...userOffers, offer])
  }
  // Gets the id of the receiver
  const getRecipientId = (id) => {
    setRecipientId(id);
    if (id !== null) {
      localStorage.setItem('recipientId', id);
    } else {
      localStorage.removeItem('recipientId');
    }
  };
  // Get the convo's id
  const getConvoId = (id) => {
    setConvoId(id)
    if (id !== null) {
      localStorage.setItem('convoId', id);
    } else {
      localStorage.removeItem('convoId');
    }
  }
  // Gets the recipient's name.
  const getRecipientName = (name) => {
    setRecipientName(name)
    if (name !== null) {
      localStorage.setItem('recipientName', name);
    } else {
      localStorage.removeItem('recipientName');
    }
  }
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
      <ScrollToTop>
        <SkeletonTheme baseColor="#636363" highlightColor="#525252">
          <ToastContainer />

          {/* Mobile Overlay When Burger is clicked */}
          <MobileOverlay setIsBurgerOpened={setIsBurgerOpened}handleLogOut={() => handleLogOut()} isBurgerOpened={isBurgerOpened} />
          {/* Login Modal that pops up when user tries to log in */}
          <LoginModal setIsProfileClicked={setIsProfileClicked} onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
          {/* Handles profile when clicked. */}
          <div className="navigation" >
            <Nav isBurgerOpened={isBurgerOpened} handleBurgerClick={handleBurgerClick} setIsBurgerOpened={setIsBurgerOpened} unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages} totalOffersLength={totalOffersLength} handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} setSearchedItems={setSearchedItems} setSearchInput={setSearchInput} searchInput={searchInput} />
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

          <Routes>
            {/* Main Page */}
            <Route path="/" element={
              <>
                <Main itemsCheapest={itemsCheapest} itemsPopular={itemsPopular} isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} addListing={addListing} items={items} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} searchedItems={searchedItems} />
              </>} />
            {/* Item Page */}
            <Route path="/item/:id" element={
              <>
                <ItemDisplay getRecipientName={getRecipientName} getConvoId={getConvoId} getRecipientId={getRecipientId} isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} item={item} setItem={setItem} items={items} updateListing={updateListing} handleOfferClick={handleOfferClick} />
                <OfferModal isOfferModalOpen={isOfferModalOpen} setIsOfferModalOpen={setIsOfferModalOpen} offerItemId={offerItemId} handleNewOfferFromUser={handleNewOfferFromUser} />
              </>} />
            {/* User's Own Listings Page */}
            <Route path="/user-listings" element={
              <>
                {currentUser && <UserListings userListings={userListings} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing={addListing} isModalDeleteOpen={isModalDeleteOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} deleteListing={deleteListing} />}
              </>} />
            {/* Search Page */}
            <Route path="/searchs?" element={
              <>
                <SearchMain isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} searchedItems={searchedItems} />
              </>} />
            {/* User's Favorites Page */}
            <Route path="/user-favorites" element={
              <>
                {currentUser && <Favorites isItemBookmarked={isItemBookmarked} toggleBookmark={toggleBookmark} bookmarkedItems={bookmarkedItems} />}
              </>} />
            {/* User's Offers Page */}
            <Route path="/user-offers" element={
              <>
                {currentUser && <Offers userListings={userListings} userOffers={userOffers} />}
              </>} />
            {/* User's Offers on an Item Page */}
            <Route path="/item/offers/:id" element={
              <>
                {currentUser && <OfferDisplay item={item} setItem={setItem} />}
              </>} />
            {/* User's Chat 1 to 1 Page */}
            <Route path="/chat/:id" element={
              <>
                <Chat setUnreadMessages={setUnreadMessages} recipientName={recipientName} cable={cable} recipientId={recipientId} convoId={convoId} />
              </>} />
            {/* All of User's Chat Page */}
            <Route path="/user-messages" element={
              <>
                <Messages getRecipientId={getRecipientId} getConvoId={getConvoId} getRecipientName={getRecipientName} />
              </>} />
          </Routes>
          {/* Foooter */}
          <Footer />

        </SkeletonTheme>
      </ScrollToTop>
    </div>

  );
}

export default App;
