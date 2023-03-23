import '../styles/globals.css'
import Nav from '../components/Nav';
import { CartContext, useCartState } from '../hooks/use-cart'

export default function App({ Component, pageProps }) {

  const cart = useCartState();

  return (

    <CartContext.Provider value={cart}>
      <Component {...pageProps}>
        <Nav/>
      </Component>
    </CartContext.Provider>

  )
}
