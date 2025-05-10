import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData, token, rememberMe = false) => {

        const userWithToken = { ...userData, token}
        setUser(userWithToken);

        if(rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userData", JSON.stringify(userData));
        }
        
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userData"); 
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);