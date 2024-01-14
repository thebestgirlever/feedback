
import canola from "./images/canola.png";
import corn from "./images/corn.png";
import oats from "./images/oats.png";
import wheat from "./images/wheat.png";
import soybeans from "./images/soybeans.png";
import barley from "./images/barley.png";

import { format } from '@astopo/price-formatter';

import styles from './Item.module.css';


const typeToSrc = {
  wheat: wheat,
  soybeans: soybeans,
  oats: oats,
  corn: corn,
  canola: canola,
  barley: barley,
}


const more = (text = '', length = 40) => {
  return text.length > length ? `${text.slice(0, length)}...` : text
}

function Item({ item }) {
  return (
    <div className={styles.item}>
      <img className={styles.image} src={typeToSrc[item.categoryType]} alt="canola" />
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {item.isLimited ? <div className={styles.limited}>Limited</div> : null}
          {item.isNew ? <div className={styles.new}>New</div> : null}
        </div>
        <div className={styles.top}>
          <div className={styles.category}>{item.categoryName}</div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.description} alt={item.description}>{more(item.description)}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>{format(item.price)}</div>
          {
            item.discount
              ? <div className={styles.discount}>Discount {format(item.discount)} per bag</div>
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default Item
