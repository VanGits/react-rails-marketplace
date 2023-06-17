import React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Main.css"

const Main = ({items}) => {

    const displayItem = items.map((item) => {
        return (
            <div className='display-item'>
                <img src={item.image_url} alt="" />
            </div>
        )
    })
    return (
        <div className='Main'> 
            {items.length > 0 ? <div className='display-items-wrapper'> {displayItem} </div>: <ImSpinner8 className='load'/> }
        </div>
    );
}

export default Main;
