import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  let { userToken, setUserToken } = useContext(AuthContext)
  const navigate = useNavigate()


  function signOut() {
    setUserToken("");
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="bg-green-600 absolute w-full">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <i class="fa-solid fa-cart-shopping p-1"></i>
            <a href="#">FreshCart</a>
          </div>
          {userToken && <div className="hidden md:block">
            <ul className="flex items-center space-x-2">
              <li><NavLink to={"/"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Home</NavLink></li>
              <li><NavLink to={"/products"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Products</NavLink></li>
              <li><NavLink to={"/categories"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Categories</NavLink></li>
              <li><NavLink to={"/brands"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Brand</NavLink></li>
              <li><NavLink to={"/cart"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Cart</NavLink></li>
              <li><NavLink to={"/wishlist"} className="block px-1 py-2 hover:text-green-200 text-lg text-white ">Wishlist</NavLink></li>
            </ul>
          </div>}

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} class="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className="social-media">
            <i className='fa-brands hover:text-green-200 text-lg text-white mx-1 fa-facebook-f'></i>
            <i className='fa-brands hover:text-green-200 text-lg text-white mx-1 fa-twitter'></i>
            <i className='fa-brands hover:text-green-200 text-lg text-white mx-1 fa-linkedin'></i>
            <i className='fa-brands hover:text-green-200 text-lg text-white mx-1 fa-youtube'></i>
            <i className='fa-brands hover:text-green-200 text-lg text-white mx-1 fa-tiktok'></i>
          </div>
          <div>
            <ul className='flex gab-1'>
              {!userToken && <>
                <li> <NavLink to={"/login"} className="block px-1 py-2 bg-white text-green-600 rounded hover:bg-gray-200 font-semibold mx-5 px-5">Login</NavLink> </li>
                <li> <NavLink to={"/register"} className="block px-1 py-2 bg-white text-green-600 rounded hover:bg-gray-200 font-semibold mx-5 px-5 ">Register</NavLink> </li>
              </>}
              {userToken && <li> <button onClick={signOut} className="block px-1 py-2 bg-white text-green-600 hover:bg-gray-200 font-semibold rounded px-5 ">Signout</button> </li>}
            </ul>
          </div>
        </div>
        {userToken && <div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu hidden md:hidden"}>
          <ul className="mt-4 space-y-4">
            <li><NavLink to={"/"} className="block px-4 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
            <li><NavLink to={"/products"} className="block px-4 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
            <li><NavLink to={"/categories"} className="block px-4 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
            <li><NavLink to={"/brands"} className="block px-4 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
            <li><NavLink to={"/cart"} className="block px-4 py-2 text-white bg-gray-900 rounded">Carts</NavLink></li>
          </ul>
        </div>}
      </nav>
    </header>
  )
}
