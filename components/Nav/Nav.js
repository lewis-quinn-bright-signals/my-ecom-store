import { FaShoppingCart } from 'react-icons/fa';

import styles from './Nav.module.css';

import { useCart } from '../../hooks/use-cart';

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>
        Test Shop
      </p>
      <p className={styles.navCart}>
        <button onClick={checkout}>
          <FaShoppingCart /> £{ subtotal }
        </button>
      </p>
    </nav>
  )
}

export default Nav;