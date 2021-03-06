import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api'


interface AuthState {
    user: object;
}

interface SignInCredentiasl {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    sigIn(credentiasl: SignInCredentiasl): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
       
        const user = localStorage.getItem('@GoBarber:user');

        if (user) {
            return { user: JSON.parse(user) };
        }

        return{} as AuthState;
    });

    const sigIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { user } = response.data;
        
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ user });

    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, []);

    return(
        <AuthContext.Provider value={{ user: data.user, sigIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an Auhprovider');
    }

    return context;
}