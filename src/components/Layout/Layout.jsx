import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return (
    <>
       <Navbar />
       <div className='pt-24 pb-8 container mx-auto'>
            <Outlet />
        </div> 
      <Footer />
    </>
  )
}
