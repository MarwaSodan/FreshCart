import '@fortawesome/fontawesome-free/css/all.min.css'; // إضافة Font Awesome
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../cartService';
import { WishlistContext } from '../../contexts/WishlistContext';
import RatingAverage from '../RatingAverage/RatingAverage';

export default function Product({ product }) {
  const { addToWishlist, wishlistCheck, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 relative">
        <i
          onClick={() => {
            wishlistCheck.some((i) => i === product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id);
          }}
          className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id)
            ? "text-red-500 "
            : "hover:text-red-500"
            } absolute top-2 right-2 duration-300 text-2xl`}
        ></i>
        <Link to={"/productDetails/" + product._id}>
          <img className='rounded-t-lg p-8' src={product.imageCover} alt="Product Image" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={"/productDetails/" + product._id}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
              {product.title}
            </h3>
            <p className="line-clamp-2">{product.description}</p>
          </Link>
          <RatingAverage rating={product.ratingsAverage} />
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <button href='#' onClick={() => addProductToCart(product._id)}
              className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-800 font-medium  rounded-lg text-white text-sm px-5 py-2.5 btn"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
