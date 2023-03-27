import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Nav.module.css';

import { useCart } from '../../hooks/use-cart';

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
        <div className={styles.navLeft}>
            <Link href={'/'}>
                <p className={styles.navTitle}>
                    Test Shop
                </p>
            </Link>
        </div>
        <div className={styles.navRight}>

            <div className={styles.navItemsCont}>
                <p className={styles.navItem}>
                    Products
                </p>
                <p className={styles.navItem}>
                    Contact
                </p>
                <p className={styles.navItem}>
                    About
                </p>
            </div>

            <a className={styles.navCart}>
                <Link href={'/Cart'}>
                    <button>
                        <FaShoppingCart /> £{ subtotal }
                    </button>
                </Link>
            </a>
        </div>
    </nav>
  )
}

export default Nav;