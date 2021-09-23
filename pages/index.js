import Head from 'next/head'

import Intro from '../components/Intro/index'
import Navbar from '../components/Navbar/index'
import Portfolio from '../components/Portfolio/index'
import Contact from '../components/Contact/index'


export default function Home() {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap" rel="stylesheet"/>
    </Head>
    <Navbar/>
      <div className="sections">
        <Intro/>
        <Portfolio/>
        <Contact/>
      </div>
    </>
  )
}

