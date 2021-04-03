import React, { useContext, useState } from 'react'
import { LobbyScreenLeft } from './LobbyScreenLeft';
import { types } from '../../types/types';
import firebase from '../../firebase/firebase'
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router';

export const LobbyScreen = () => {

    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const [inputIdGamer, setInputIdGamer] = useState('');
    const [inputIdGame, setInputIdGame]   = useState('');
    const [select, setSelect]             = useState('');

    const handleLogOut = () =>{
        dispatch({
            type: types.logout
        })
        firebase.logOut();
        history.replace('/login');
    }

    return (
        <div className="container card animate__animated animate__backInLeft animate__delay-0s">
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="text-right">

                    <div style={{ textAlign: 'center' }}>
                        <h3>Lobby</h3>
                    </div>
                    <button 
                        className="btn btn-outline-danger " 
                        onClick={ handleLogOut }
                        > Logout
                    </button> 
                </div>
                    < LobbyScreenLeft 
                        setSelect           =   { setSelect }
                        select              =   { select }
                        setInputIdGamer     =   { setInputIdGamer}
                        setInputIdGame      =   { setInputIdGame}
                        inputIdGame         =   { inputIdGame }
                        inputIdGamer        =   { inputIdGamer }/>
            </div>
        </div>
    )
}
