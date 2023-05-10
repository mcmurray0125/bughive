import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [userAuth, setUserAuth] = useState(null)

    //Check if user has a valid token
    //If token, navigate to index/home
    //else navigate to Login.


    const value = {
        userAuth
    }


  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}