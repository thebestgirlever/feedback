import styles from  './Header.module.css';

function Header({ searchChange }) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Products</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <g clipPath="url(#a)">
              <path fill="#A8B8CA" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0a4.5 4.5 0 1 1-.01-8.99A4.5 4.5 0 0 1 9.5 14Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
              </clipPath>
            </defs>
          </svg>
          <input
            name="search"
            type="text"
            className={styles.field}
            placeholder="Search among products"
            onChange={e => {
              searchChange(e.target.value)
              }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
