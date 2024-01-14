import { useState } from 'react';

import Item from "./Item";
import './List.css';

function List({ items }) {
  return (
    <div className="list">
      <div className="list__container">
        {items.map(item => <Item item={item} key={item.id} />)}
      </div>
    </div>
  )
}

export default List
