import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserToken } = useContext(AuthContext);

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Enter valid Email"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be at least 8 characters long, contain one letter, one number, and one special character"),
    });

    const initialValues = {
        email: "mrwtswdan@gmail.com",
        password: "mero@2001"
    };

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit() {
        setErrorMsg("");
        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
            setUserToken(data.token);
            localStorage.setItem("token", data.token);
            navigate(window.location.pathname === "/login" ? "/" : window.location.pathname);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='py-12 flex items-center justify-center'>
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My FreshCart</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {touched.password && errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>

                    <div className="text-right mb-4">
                        <Link to="/forgot-password" className="text-green-500 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>

                    {errorMsg && <div className="text-red-500 mb-4 text-center">{errorMsg}</div>}

                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                    <Link to="/register" className="text-green-500 hover:text-green-600">Register</Link>
                </div>
            </div>
        </div>
    );
}
