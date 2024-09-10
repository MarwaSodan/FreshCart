import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

export default function ProtectAuthRoute({children}) {
    const {userToken} = useContext(AuthContext)
    return (
    <>
    {
       !userToken ? children : <Navigate to={"/"} />
    }
    </>
  )
}
