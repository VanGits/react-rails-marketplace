import { useEffect, useState } from "react";
import "../src/App.css"
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal";
import Main from "./components/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ImClearFormatting } from "react-icons/im";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const handleLogInModal = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user));
      } else {
        toast.error("Please log in");
      }
    });
  }, []);

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
        if (r.ok){
            setCurrentUser(null)
            
            
            
        } 
    });
  }
  
  return (
    <div className="App">
      <ToastContainer />
      <div className="navigation">
        <Nav handleLogInModal={handleLogInModal} currentUser={currentUser} handleProfileClick = {handleProfileClick}/>
        {isProfileClicked && currentUser && <div className="profile-pop-up">
          <div className="profile-details">
          <img src={currentUser && currentUser.image_url}/>
          <div className="profile-texts"> 
          <h1>{currentUser && currentUser.name}</h1>
          <p>View Profile</p>
          </div>
          
          </div>
          <p onClick={handleLogOut}>Log out</p>
          
        </div>}
      </div>

      <LoginModal setIsProfileClicked= {setIsProfileClicked}onLogin={onLogin} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
      <Main items={items} />

    </div>
  );
}

export default App;
