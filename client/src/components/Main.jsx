import React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../styles/Main.css"

const Main = ({items}) => {
    return (
        <div className='Main'> 
            {items.length > 0 ? <p>hello </p>: <ImSpinner8 className='load'/> }
        </div>
    );
}

export default Main;
