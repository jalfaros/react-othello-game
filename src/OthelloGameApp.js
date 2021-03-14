import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'
import firebase from './firebase/firebase'

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const OthelloGameApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init)

    useEffect(() => {

        // firebase.auth.onAuthStateChanged(use =>{
        //     if( use ){
        //         localStorage.setItem('user', JSON.stringify(use.displayName));
    
        //     }else{
        //         localStorage.setItem('user', JSON.stringify(user));

        //     }
        // })
        localStorage.setItem('user', JSON.stringify(user));

    }, [user])
    

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter/>
        </AuthContext.Provider>
    )
}


