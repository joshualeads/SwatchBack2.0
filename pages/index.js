import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SwatchBack</title>
        <meta name="description" content="Swatch Back" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">SwatchBack!</a>
        </h1>

        <p className={styles.description}>
          Get started by searching your favourite  product
        </p>

        <div className={styles.grid}>
          <a href="/" className={styles.card}>
            <h2>Foundation &rarr;</h2>
            <p>Find in-depth information about Foundation Products.</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>Dupes &rarr;</h2>
            <p>Want to know more about Dupes and its types?</p>
          </a>

          <a
            href="/"
            className={styles.card}
          >
            <h2>Login &rarr;</h2>
            <p>Discover and deploy your Style with us</p>
          </a>

          <a
            href="/"
            className={styles.card}
          >
            <h2>Sign Up &rarr;</h2>
            <p>
              Instantly join our family and have fun
            </p>
          </a>
        </div>
      </main>

    </div>
  )
}
