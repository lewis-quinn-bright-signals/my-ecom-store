import Head from 'next/head'
import styles from '../../styles/Product.module.css'
import '<test>/styles/Home.module.css'
import { useCart } from '../../hooks/use-cart.js';
import Nav from '../../components/Nav';
import products from '../../products.json';


export default function Product({ product }) {

  const { id, title, image, price, description } = product;

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Test Site - { title }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>
            { title }
          </h1>

          <p className={styles.description}>
            { description }
          </p>

          <p className={styles.description}>
            ${ price.toFixed(2) }
          </p>

          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>
      </main>

    </div>
  )
}

export async function getStaticProps({ params = {} }) {
  const product = products.find(({ id }) => `${id}` === `${params.productId}`);
  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    const { id } = product;
    return {
      params: {
        productId: id,
      },
    };
  });

  return {
    paths,
    fallback: false
  };
}