import React from 'react'
import firebase from '../../firebase/firebase';

import { types } from '../../types/types';

export const ButtonsOptions = ({history, dispatch}) => {

    const handleLogOut = () =>{

        dispatch({
            type: types.logout
        })
        firebase.logOut();
        window.location.reload()
        history.replace('/login');
    }

    return (
        <>
            <div className="text-right">
                <button 
                    className="btn btn-outline-info m-2" 
                    onClick={ () => {history.push('/lobby'); window.location.reload();} }
                    > Lobby
                </button> 

                <button 
                    className="btn btn-outline-info m-2" 
                    onClick={ handleLogOut }
                    > Logout
                </button> 
            </div>
            
        </>
    )
}
