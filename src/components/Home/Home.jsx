import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PopularCategories from '../PopularCategories/PopularCategories';
import Products from '../Products/Products';
import { Helmet } from 'react-helmet';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className='container mx-auto'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <PopularCategories/>
      {loading ? <LoadingScreen  /> : <Products products={products} />}
    </div>
  );
}
