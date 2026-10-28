import { useState, useEffect, createContext } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import type { AuthContextType } from "../types/authContext";
import type { LoginResponse } from "../types/auth"
import { TOKEN_KEY,USER_KEY } from "../utils/constants";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const restore = () => {
            try {
                const storedToken = localStorage.getItem(TOKEN_KEY);
                const storedUser = localStorage.getItem(USER_KEY);
                if (storedToken && storedUser) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);                    
                }
            }
            catch {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            }
            finally {
                setIsLoading(false);
            }
        }
        restore();
    }, []);
    const login = (data:LoginResponse) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    }
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }
    const isAuthenticated=token!==null;
    const value = {
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
   
}

export default AuthProvider
