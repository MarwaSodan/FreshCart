import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Product from '../product/Product';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
  }

  return (<>
    <Helmet>
      <title>Products</title>
    </Helmet>
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full my-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <h2 className="text-4xl text-main text-center my-4">Our Products</h2>
    <div className="grid grid-cols-4 gap-3">

      {products.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
  </>
  );
}

