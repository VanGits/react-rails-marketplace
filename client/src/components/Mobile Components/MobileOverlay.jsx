import React from "react";
import "../../styles/Mobile Components/MobileOverlay.css"
const MobileOverlay = ({ isBurgerOpened }) => {

    
    return(
        <div className={`MobileOverlay ${isBurgerOpened ? "show" : ""}`}>
            hello
        </div>
    )
}

export default MobileOverlay