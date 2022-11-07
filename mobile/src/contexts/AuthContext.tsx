import React, { createContext, ReactNode } from "react";

interface UserProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: UserProps
    signIn: () => Promise<void>
}

export interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {

    async function signIn() {
        console.log('vamos logar')
    }

    return ( 
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Romeu',
                avatarUrl: 'https://github.com/romeucr.png'
            }
        }}>
            {children}
        </AuthContext.Provider> 
    )
}