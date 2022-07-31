import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/global/Layout'
import styles from '../styles/Home.module.css'
import { useFetchUser } from '../lib/authContext'
import { useSession } from 'next-auth/react';
import React from 'react'
 
export default function Home() {
  const { user, loading } = useFetchUser();
  const { data } = useSession();

  return (
    <Layout user={user}>
      <div className={styles.container}>
        <Head>
          <title>SwatchBack</title>
          <meta name="description" content="Swatch Back" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.main}>

          {/* 
          <h1 className={styles.title}>
            Welcome to <Link href="/"><span className='sbLink'>SwatchBack!</span></Link>
          </h1>

          <p className={styles.description}>
            Get started by searching your favourite  product
          </p>
          */}
          
          <div className={styles.grid}>
            <Link href="/foundation">
              <div className={styles.card}>
                <h2>Foundation &rarr;</h2>
                <p>Find in-depth information about Foundation Products.</p>
              </div>
            </Link>

            <Link href="/dupes">
              <div className={styles.card}>
                <h2>Dupes &rarr;</h2>
                <p>Want to know more about Dupes and its types?</p>
              </div>
            </Link>

            <Link href="/">
              <div className={styles.card}>
                <h2>Login &rarr;</h2>
                <p>Discover and deploy your Style with us</p>
              </div>
            </Link>

            <Link href="/">
              <div className={styles.card}>
                <h2>Sign Up &rarr;</h2>
                <p>
                  Instantly join our family and have fun
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  )
}