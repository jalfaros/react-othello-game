import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import firebase from '../../firebase/firebase';

import { types } from '../../types/types';

export const ButtonsOptions = () => {

    const { dispatch } = useContext(AuthContext);
    const history      = useHistory();

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
                    className="btn btn-outline-danger m-2" 
                    onClick={ handleLogOut }
                    > Logout
                </button> 
            </div>
            
        </>
    )
}
