import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const authInfo = {
        user,
        setUser: (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        },
        error,
        setError,
        loading,
        setLoading,
        signOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
