import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const OthelloGameApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init)

    useEffect(() => {

        localStorage.setItem('user', JSON.stringify(user));

    }, [user])
    

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter/>
        </AuthContext.Provider>
    )
}


