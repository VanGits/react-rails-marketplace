import { useState } from "react";
import "../src/App.css"
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogIn = (clicked) => {
    if (clicked) {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <div className="App">

      <Nav handleLogIn={handleLogIn}/>
      <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen}/>
    </div>
  );
}

export default App;
