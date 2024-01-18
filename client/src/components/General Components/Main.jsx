import React, { useContext, useRef } from 'react';
import "../../styles/General Components/Main.css";
import { useNavigate } from 'react-router-dom';
import banner from "../../assets/banner.jpg";

import ListingModal from '../App Modals/ListingModal';

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Skeleton from 'react-loading-skeleton';

const Main = ({ itemsCheapest, itemsPopular, items, isModalOpen, setIsModalOpen, addListing, toggleBookmark, isItemBookmarked }) => {
    const navigate = useNavigate();
    const displayRef = useRef(null);

    const handleItemClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };

    // Moves view to items when clicked
    const scrollToDisplay = () => {
        if (displayRef.current) {
            displayRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const displayItem = items?.map((item, index) => {
        const truncatedTitle = truncateTitle(item.title, 20);


        return (
            <div className='display-item' key={item.id}>
                <div className="image-container" onClick={() => handleItemClick(item.id)}>
                  
                    <img src={item.image_url} alt={index} loading='lazy' />  
                   
                </div>
                <div className="item-details-display">
                    <div className="display-details">
                        <p className='title-detail'>{truncatedTitle}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <h4>{item?.location}</h4>
                    </div>

                </div>
                <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
                        {isItemBookmarked(item.id) ? <IoMdHeart className='filled' /> : <IoMdHeartEmpty className='empty' />}
                    </div>
            </div>
        );
    });
    const displayPopular = itemsPopular?.map((item, index) => {
        const truncatedTitle = truncateTitle(item.title, 20);


        return (
            <div className='display-item' key={item.id}>
                <div className="image-container" onClick={() => handleItemClick(item.id)}>
                  
                    {<img src={item.image_url} alt={index} loading='lazy' />}
                   
                </div>
                <div className="item-details-display">
                    <div className="display-details">
                        <p className='title-detail'>{truncatedTitle}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <h4>{item?.location}</h4>
                    </div>

                </div>
                <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
                        {isItemBookmarked(item.id) ? <IoMdHeart className='filled' /> : <IoMdHeartEmpty className='empty' />}
                    </div>
            </div>
        );
    });
    const displayCheapest = itemsCheapest?.map((item, index) => {
        const truncatedTitle = truncateTitle(item.title, 20);


        return (
            <div className='display-item' key={item.id}>
                <div className="image-container" onClick={() => handleItemClick(item.id)}>
                  
                    {<img src={item.image_url} alt={index} loading='lazy' />}
                   
                </div>
                <div className="item-details-display">
                    <div className="display-details">
                        <p className='title-detail'>{truncatedTitle}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <h4>{item?.location}</h4>
                    </div>

                </div>
                <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
                        {isItemBookmarked(item.id) ? <IoMdHeart className='filled' /> : <IoMdHeartEmpty className='empty' />}
                    </div>
            </div>
        );
    });
   
    
    const handleClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='Main'>
            {banner && (
                <div className='main__banner'>
                    <img src={banner} alt="" className='banner' />
                    <div className="banner__typography">
                      
                        <h1>The best place to buy </h1>
                        <h1>and sell recycled items.</h1>
                        <button onClick={scrollToDisplay}>BROWSE ITEMS</button>
                        {/* <div className="banner__search">

                        </div> */}

                    </div>

                </div>



            )}

            

            {items.length > 0 ? (
                <div className='display__items'>
                    <h1 ref={displayRef}>Trending on GoRecycle</h1>
                    <p>Promoted items you might be interested in.</p>
                    <div className='display-items-wrapper'>{displayPopular}</div>
                    <h1>Cheapest Postings</h1>
                    <p>Cheap items you might be interested in.</p>
                    <div className='display-items-wrapper'>{displayCheapest}</div>
                    <h1>Recent Postings</h1>
                    <p>Recent items you might be interested in.</p>
                    <div className='display-items-wrapper'>{displayItem}</div>
                </div>
            ) : (
                <div className='display__items'>
                    <h1>Trending on GoRecycle</h1>
                    <p>Promoted items you might be interested in.</p>
                    <div className='display-items-wrapper'>
                        {Array.from({ length: 8 }).map((_, index) => {
                          
                            return (
                                <div className='display-item' key={index}>
                                    <div className="image-container">
                                        {/* Add skeleton loading */}
                                        {<Skeleton height={"100%"} />}

                                    </div>
                                    <div className="item-details-display">
                                        <div className="display-details">
                                            <p className='title-detail'><Skeleton height={"100%"} width={"100%"} /></p>
                                            <p><Skeleton /></p>
                                            <h4><Skeleton /></h4>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
            }
            <ListingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addListing={addListing} />
        </div>
    );
};

export default Main;