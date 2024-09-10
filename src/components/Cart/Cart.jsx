import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({ data: { products: [], totalCartPrice: 0 } });
  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCart(data); // Save the data if it's available
    } catch (error) {
      console.error("Failed to fetch cart", error);
      // Handle error as needed
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCart({ data: { products: [], totalCartPrice: 0 } }); // Reset cart after clearing
    } catch (error) {
      console.error("Failed to clear cart", error);
      // Handle error as needed
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cart.data.products.length > 0 ? (
        <>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cart?.data.products.map((product, index) => (
                <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
              ))}
            </div>
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${cart.data.totalCartPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">${cart.data.totalCartPrice.toFixed(2)} USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Link
                to={"/shippingAddress/" + cart?.data._id}
                className="text-center block mt-6 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Check out
              </Link>
            </div>
          </div>
          <div className="w-72 mx-auto">
            <button
              onClick={() => clearCart()}
              type="submit"
              className="text-white  border-2 w-full my-4 duration-300 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <h1 className='text-center text-4xl font-bold'>No Product in your cart</h1>
      )}
    </div>
  );
}
