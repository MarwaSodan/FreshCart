import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function CartProduct({ product, setCart, cart }) {
    const [isIncreaseLoading, setIsIncreaseLoading] = useState(false);
    const [isDecreaseLoading, setIsDecreaseLoading] = useState(false);
    const [productCount, setProductCount] = useState(product.count);

    useEffect(() => {
        // Sync productCount with product count from props
        setProductCount(product.count);
    }, [product.count, cart]);

    async function updateProductCount(productId, count) {
        if (count < 1) return; // Prevent setting count below 1

        try {
            if (count > productCount) {
                setIsIncreaseLoading(true);
            } else {
                setIsDecreaseLoading(true);
            }

            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                { headers: { token: localStorage.getItem("token") } }
            );

            setCart(data);
            setProductCount(count); // Update local count
        } catch (error) {
            toast.error("Error updating product count", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsIncreaseLoading(false);
            setIsDecreaseLoading(false);
        }
    }

    async function removeProductFromCart(productId) {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers: { token: localStorage.getItem("token") } }
            );
            setCart(data);
            toast.success("Product has been removed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            toast.error("Error removing product from cart", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleBlur = () => {
        const newCount = Math.max(parseInt(productCount, 10) || 1, 1);
        if (newCount !== product.count) {
            updateProductCount(product.product._id, newCount);
        }
    };

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.product.imageCover} alt={product.product.title} className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">${product.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button
                            disabled={productCount === 1 || isDecreaseLoading}
                            onClick={() => updateProductCount(product.product._id, productCount - 1)}
                            className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                            {isDecreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : '-'}
                        </button>
                        <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={productCount}
                            min="1"
                            onChange={(e) => setProductCount(e.target.value)}
                            onBlur={handleBlur}
                        />
                        <button
                            disabled={isIncreaseLoading}
                            onClick={() => updateProductCount(product.product._id, productCount + 1)}
                            className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                            {isIncreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : '+'}
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${product.price * productCount} ₭</p>
                        <svg
                            onClick={() => removeProductFromCart(product.product._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
