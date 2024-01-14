import styles from  './Filters.module.css';

function Filters({ items, current, onCurrentChange, isLimited, onIsLimitedChange, isNew, onIsNewChange }) {
  console.log('items, current >?>>', isNew)

  return (
    <div className={styles.filters}>
      <div className={styles.block}>
        <div className={styles.top}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="#fff" d="M0 0h24v24H0z" />
            <path fill="#037BFF" d="M17 21h2v-6h-2v6ZM5 21h2V11H5v10Zm16-10h-2V3h-2v8h-2v2h6v-2ZM9 17h2v4h2v-4h2v-2H9v2Zm4-14h-2v10h2V3ZM9 9V7H7V3H5v4H3v2h6Z" />
          </svg>
          <p className={styles.title}>Filters</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.category}>
            <div className={styles.section}>category</div>
            <div className={styles.buttons}>
              {items.map((item) => {
                return (
                  <button
                    key={item.id}
                    className={`${styles.button} ${item.type === current ? styles.button_active : ''}`}
                    onClick={() => onCurrentChange(item.type)}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
          <div className={styles.status}>
            <div className={styles.section}>status</div>
            <div className={styles.checkBox}>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  id="limited"
                  type="checkbox"
                  name="status"
                  checked={isLimited}
                  onChange={e => {
                    onIsLimitedChange(!e.target.value)
                  }}
                />
                Limited
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  id="new"
                  type="checkbox"
                  name="status"
                  checked={isNew}
                  onChange={e => {
                    onIsNewChange(!e.target.value)
                  }}
                />
                New
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filters
