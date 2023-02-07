import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '<test>/styles/Home.module.css'

import { initiateCheckout } from '../lib/payments.js';

const inter = Inter({ subsets: ['latin'] })

import products from '../products.json';

const defaultCart = {
  products: {}
};

export default function Home() {

  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map(key => {

    const product = products.find(( { id }) => `${id}` === `${key}`);

    return{

      ...cart.products[key],
      pricePerItem: products.price

    }
  });

  const subtotal = cartItems.reduce((accumulator, { pricePerItem, quantity }) => {
    return accumulator + ( pricePerItem * quantity)
  }, 0);

  console.log('subtotal', subtotal);

  function addToCart ({ id } = {}) {
    updateCart(prev => {
      let cartState = {...prev};

      if ( cartState.products[id] ) {
        cartState.products[id] = cartState.products[id] + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }

      return cartState;
    })
  };


  
  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div>
          <h1 className={styles.title}>
            Test Shop
          </h1>

          <p className={styles.description}>
            This is a test shop
          </p>

          <p className={styles.description}>
            <strong>Items: 2</strong>
            <br/>
            <strong>Total Cost: £20</strong>
            <br/>
            <button className={styles.button}>Checkout</button>
          </p>
        </div>

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, price, description, image } = product;
            return(
              <li key={ id } className={styles.card}>
                <a href="#">
                  <img src={ image } alt={ title }></img>
                  <h2 className={inter.className}>
                    { title }
                  </h2>
                  <h3>{ price }</h3>
                  <p className={inter.className}>
                    { description }
                  </p>
                </a>
                <p>
                  <button className={styles.button} onClick={() =>{
                    addToCart({
                      id
                    })
                    // initiateCheckout({
                    //   lineItems: [
                    //     {
                    //       price: id,
                    //       quantity: 1
                    //     }
                    //   ]
                    // });
                  }}>Buy Now!</button>
                </p>
              </li>
            )
          })}

        </ul>
      </main>
    </>
  )
}
