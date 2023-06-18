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

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [userListings, setUserListings] = useState([])
  const [item, setItem] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      <UserContext.Provider value={currentUser}>
        <Routes>


          <Route path="/" element={
            <>
              <div className="navigation">
                <Nav handleLogInModal={handleLogInModal} handleProfileClick={handleProfileClick} />
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
              <Main items={items} isModalOpen={isModalOpen} setIsModalOpen= {setIsModalOpen}/></>} />
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
              <ItemDisplay item={item} setItem={setItem} items = {items} />
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
              {currentUser && <UserListings userListings={userListings} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
            </>} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
