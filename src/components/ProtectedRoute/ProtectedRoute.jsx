import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
    const { userToken } = useContext(AuthContext)
    return (
    <>
      {
         userToken ?  children : <Login />
      }
    </>
  )
}
