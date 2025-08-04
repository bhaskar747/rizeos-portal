// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/api/index.js'; // <-- CORRECTED PATH

const AuthContext = createContext();

// ... rest of the file is the same
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const fetchUserProfile = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const updatedUser = { ...data, token: storedUser.token };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
