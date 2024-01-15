import React, { useContext } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import "../../styles/General Components/Main.css";
import { useNavigate } from 'react-router-dom';
import banner from "../../assets/banner.jpg";
import UserContext from "../../context/UserContext";
import ListingModal from '../App Modals/ListingModal';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';

const Main = ({ items, isModalOpen, setIsModalOpen, addListing, toggleBookmark, isItemBookmarked }) => {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);


    const handleItemClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };



    const displayItem = items?.map((item, index) => {
        const truncatedTitle = truncateTitle(item.title, 20);


        return (
            <div className='display-item' key={item.id}>
                <div className="image-container" onClick={() => handleItemClick(item.id)}>
                    {/* Add skeleton loading */}
                    {<img src={item.image_url} alt={index} loading='lazy' /> || <Skeleton />}
                    <div className="bookmark" onClick={() => toggleBookmark(item.id)}>
                        {isItemBookmarked(item.id) ? <BsBookmarkFill className='filled' /> : <BsBookmark className='empty' />}
                    </div>
                </div>
                <div className="item-details-display">
                    <div className="display-details">
                        <p className='title-detail'>{truncatedTitle}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <h4>{item?.location}</h4>
                    </div>

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
                        <h1>The best place to buy and sell recycled items.</h1>
                        {/* <div className="banner__search">

                        </div> */}

                    </div>

                </div>



            )}

            

            {items.length > 0 ? (
                <div className='display__items'>
                    <h1>Trending on GoRecycle</h1>
                    <p>Promoted items you might be interested in.</p>
                    <div className='display-items-wrapper'>{displayItem}</div>
                </div>
            ) : (
                <div className='display__items'>
                    <h1>Trending on GoRecycle</h1>
                    <p>Promoted items you might be interested in.</p>
                    <div className='display-items-wrapper'>
                        {Array.from({ length: 8 }).map((_, index) => {
                            console.log("skeleton");
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