import Head from 'next/head'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Cart.module.css'
import { useCart } from '../hooks/use-cart';
import Table from '../components/Table';
import Nav from '../components/Nav';
import products from '../products.json'

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name'
  },
  {
    columnId: 'quantity',
    Header: 'Quantity'
  },
  {
    columnId: 'pricePerUnit',
    Header: 'Price Per Item'
  },
  {
    columnId: 'total',
    Header: 'Item Total'
  }
];

export default function Cart() {

     const { cartItems, checkout, updateItem } = useCart();

     console.log('cartItem', cartItems)

  const data = cartItems.map(item => {

    const product = products.find(({ id }) => id === item.id)

    const Quantity = () => {

        function handleOnSubmit(e) {
            e.preventDefault();

            const { currentTarget } = e;
            const inputs = Array.from(currentTarget.elements);
            const quantity = inputs.find(input => input.name === 'quantity')?.value

            updateItem({
                id: item.id,
                quantity: quantity && parseInt(quantity)
            })

            console.log('swubmit', quantity)
        }

        return (
            <form onSubmit={handleOnSubmit}>
                <input type="number" name="quantity" min={0} defaultValue={item.quantity}/>
                <button>
                    Update
                </button>
            </form>
        )
    }

    return {
        ...item,
        quantity: <Quantity/>,
        total: item.quantity * item.pricePerUnit,
        title: product.title
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>

      <main className={styles.main}>

        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
