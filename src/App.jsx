import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Offline } from 'react-detect-offline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import EnterNewPassword from './components/EnterNewPassword/EnterNewPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Orders from './components/Orders/Orders';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import ProtectAuthRoute from './components/ProtectAuthRoute/ProtectAuthRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ShippingAddress from './components/ShippingAddress/ShippingAddress';
import Wishlist from './components/Wishlist/Wishlist';
import AuthContextProvider from './contexts/AuthContext';
import CartContextProvider from './contexts/CartContext';
import CounterContextProvider from './contexts/CounterContext';
import NameContextProvider from './contexts/NameContext';
import WishlistContextProvider from './contexts/WishlistContext';


function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'login', element: <ProtectAuthRoute><Login /></ProtectAuthRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'register', element: <ProtectAuthRoute><Register /></ProtectAuthRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'forgot-password', element: <ProtectAuthRoute><ForgotPassword /></ProtectAuthRoute> },
        { path: 'resetpassword', element: <ProtectAuthRoute><ResetPassword /></ProtectAuthRoute> },
        { path: 'enternewpassword', element: <ProtectAuthRoute><EnterNewPassword /></ProtectAuthRoute> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NameContextProvider>
          <CounterContextProvider>
            <CartContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={router} />
                <ToastContainer />
                <div className='fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200'>
                  <Offline>Only shown offline (surprise!)</Offline>
                </div>
              </WishlistContextProvider>
            </CartContextProvider>
          </CounterContextProvider>
        </NameContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
