import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { addProductToCart } from '../../cartService';
export default function RelatedProducts({ products }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="mt-16">
            <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
            <Slider {...settings}>
                {products.map((product, index) => {
                    return <div key={index} className="w-full max-w-sm mx-auto  p-2 overflow-hidden ">
                        <div className='shadow-md rounded-md'>
                            <div className="flex items-end bg-center justify-end h-56 w-full bg-cover" style={{ "background-image": `url(${product.imageCover})` }}>
                                <button onClick={() => addProductToCart(product._id)} className="p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-5 py-3">
                                <Link to={`/product-details/${product._id}`}>
                                    <h3 className="text-gray-700 uppercase line-clamp-1">{product.title}</h3>
                                </Link>

                                <span className="text-green-500 mt-2">${product.price}</span>
                            </div>
                        </div>
                    </div>
                })}
            </Slider >
        </div >
    );
}

