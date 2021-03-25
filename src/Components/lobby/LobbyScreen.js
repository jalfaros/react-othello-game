import React, { useContext, useEffect, useState } from 'react'
import { getGamesUser } from '../../helpers/getInitialGame';
import { LobbyScreenLeft } from './LobbyScreenLeft';
import { LobbyScreenRigth } from './LobbyScreenRigth';
import { types } from '../../types/types';
import firebase from '../../firebase/firebase'
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router';

export const LobbyScreen = () => {

    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const [idGames, setIdGames]           = useState([]);
    const [inputIdGamer, setInputIdGamer] = useState('');
    const [inputIdGame, setInputIdGame]   = useState('');
    const [select, setSelect]             = useState('');

    const idUser = JSON.parse(localStorage.getItem('id'));

    useEffect(() => {
        getGamesUser( idUser ).then( m => {
            setIdGames(m.games);
        })
    }, [idUser])

    const handleLogOut = () =>{
        dispatch({
            type: types.logout
        })
        firebase.logOut();
        history.replace('/login');
    }

    return (
        <div className="container">

            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
            <div className="text-right">
                <button 
                    className="btn btn-outline-danger " 
                    onClick={ handleLogOut }
                    > Logout
                </button> 
            </div>
                <LobbyScreenLeft 
                    setIdGames={ setIdGames }
                    setSelect ={ setSelect }
                    idGames   ={ idGames }
                    idUser    ={ idUser }/>

                <LobbyScreenRigth 
                    setInputIdGamer= { setInputIdGamer}
                    setInputIdGame = { setInputIdGame}
                    setSelect      = { setSelect }
                    inputIdGame    = { inputIdGame }
                    inputIdGamer   = { inputIdGamer }
                    select         = { select }
            
                    />
            </div>
        </div>
    )
}
