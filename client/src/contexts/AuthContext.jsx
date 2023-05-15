import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [authLevel, setAuthLevel] = useState("");

    let token = localStorage.getItem("token");

    useEffect(() => {
      if (token != null) {
        setIsAuthenticated(true);
      }
    }, [token]);

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };

    const value = {
        isAuthenticated,
        authLevel,
        setAuth,
        setAuthLevel
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}