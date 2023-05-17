import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [role, setRole] = useState("");

    let token = localStorage.getItem("token");

    useEffect(() => {
      if (token == null) {
        setIsAuthenticated(false);
      }
      setRole(localStorage.getItem("role"))
    }, [token]);

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };

    const value = {
        isAuthenticated,
        role,
        setAuth,
        setRole
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}