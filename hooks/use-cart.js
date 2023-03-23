import { useState, createContext, useContext, useEffect } from "react"

import products from '../products.json';

import { initiateCheckout } from '../lib/payments.js';

const defaultCart = {
    products: {}
  };

export const CartContext = createContext()

export function useCartState() { 

    const [cart, updateCart] = useState(defaultCart);

    useEffect(() => {
        const stateFromStorage = window.localStorage.getItem('test_cart');
        const data = stateFromStorage && JSON.parse(stateFromStorage);
        if ( data ) {
          updateCart(data);
        }
      }, []);

    useEffect(() => {
        const data = JSON.stringify(cart);
        window.localStorage.setItem('test_cart', data);
    }, [cart])

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
          ...cart.products[key],
          pricePerUnit: product.price
        }
      });
    
      const subtotal = cartItems.reduce((accumulator, { pricePerUnit, quantity }) => {
        return accumulator + ( pricePerUnit * quantity );
      }, 0);
    
      console.log('subtotal', subtotal)
    
      const totalItems = cartItems.reduce((accumulator, { quantity }) => {
        return accumulator + quantity;
      }, 0);
    
    
    
      function addToCart({ id }) {
        updateCart((prev) => {
          let cart = {...prev};
    
          if ( cart.products[id] ) {
            cart.products[id].quantity = cart.products[id].quantity + 1;
          } else {
            cart.products[id] = {
              id,
              quantity: 1
            }
          }
    
          return cart;
        })
        console.log('fire')
        // return () => {
        //   cart.kill();
        // }
    
      }
    
      function checkout() {
        initiateCheckout({
          lineItems: cartItems.map(item => {
            return {
              price: item.id,
              quantity: item.quantity
            }
          })
        })
      }
    
    return {
        cart,
        updateCart,
        subtotal,
        totalItems,
        addToCart,
        checkout
    }
}

export function useCart() {
    const cart = useContext(CartContext);
    return cart;
}