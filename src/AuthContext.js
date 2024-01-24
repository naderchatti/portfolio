// AuthContext.js
import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const contextValue = {
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};