import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [role, setRole] = useState("");
    const [rootPath, setRootPath] = useState("")
    const [username, setUsername] = useState("");

    let token = localStorage.getItem("token");

    useEffect(() => {
      if (token == null) {
          setIsAuthenticated(false);
      } else {
          setRole(localStorage.getItem("role"));
          setUsername(localStorage.getItem("username"));
          setRootPath(role === "admin" ? "/admin" : "/general");
      }
    }, [token, role]);
    
    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };


    const value = {
        isAuthenticated,
        role,
        setAuth,
        setRole,
        setUsername,
        username,
        rootPath
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}