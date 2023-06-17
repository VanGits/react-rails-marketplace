import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDisplay = ({item, setItem}) => {
    console.log(item)
    const params = useParams();
    console.log(params.id, "h")
    useEffect(() => {
      const paramsId = params.id
      
      fetch(`/items/${paramsId}`)
        .then((r) => r.json())
        .then(itemData => setItem(itemData))
    },[])
    return (
        <div className='item-display'>
            {item &&<img src={item.image_url} alt="" />}
        </div>
    );
}

export default ItemDisplay;
