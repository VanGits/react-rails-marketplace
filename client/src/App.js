import { useState } from "react";
import "../src/App.css"
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal";
import Main from "./components/Main";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const handleLogIn = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <div className="App">

      <Nav handleLogIn={handleLogIn}/>
      <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen}/>
      <Main items = {items}/>
    </div>
  );
}

export default App;
