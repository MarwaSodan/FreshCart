import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addProductToCart } from '../../cartService';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import RatingAverage from '../RatingAverage/RatingAverage';
import RelatedProducts from '../RelatedProducts/RelatedProducts';

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getProductDetails() {
    try {
      setIsLoading(true);
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
      setProductDetails(data.data);
      getRelatedProducts(data.data?.category._id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching the product details", error);
    }
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        category: categoryId
      }
    });
    setRelatedProducts(data.data);
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white">
          <main className="my-8">
            <div className="container mx-auto px-6">
              {/* استخدام Flexbox لجعل الصورة بجانب النص */}
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                {/* عرض الصور */}
                <div className="w-full md:w-1/3">
                  <ProductImageSlider images={productDetails?.images} />
                </div>

                {/* عرض تفاصيل المنتج */}
                <div className="w-full md:w-2/3 mt-4 md:mt-0">
                  <h3 className="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                  <span className="text-gray-500 mt-3">${productDetails?.price}</span>
                  <hr className="my-3" />

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm">Rating:</label>
                    <div className="flex items-center mt-1">
                      <RatingAverage rating={productDetails?.ratingsAverage ?? 0} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm">Description:</label>
                    <p>{productDetails?.description}</p>
                  </div>

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm">Category:</label>
                    <p>{productDetails?.category.name}</p>
                  </div>

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm">SubCategory:</label>
                    <p>{productDetails?.subcategory[0].name}</p>
                  </div>

                  <div className="mt-3">
                    <label className="text-gray-700 text-sm">Brand:</label>
                    <p>{productDetails?.brand.name}</p>
                  </div>

                  <div className="flex items-center mt-6">
                    <button className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                      Order Now
                    </button>
                    <button onClick={() => addProductToCart(productDetails._id)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
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
                </div>
              </div>

              {/* المنتجات المشابهة */}
              <RelatedProducts products={relatedProducts} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
