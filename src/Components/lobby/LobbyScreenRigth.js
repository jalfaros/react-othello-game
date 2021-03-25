import React, { useContext } from 'react'
import { types } from '../../types/types';
import firebase from '../../firebase/firebase'
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router';
import { createRoom } from '../../helpers/getInitialGame';

export const LobbyScreenRigth = ({setInputIdGamer, setInputIdGame, setSelect, inputIdGame, inputIdGamer, select}) => {

    const { dispatch } = useContext(AuthContext);

    const history = useHistory();

    const handleLogOut = () =>{
        dispatch({
            type: types.logout
        })
        firebase.logOut();
        history.replace('/login');
    }
    const inputOnChange= (e) =>{
        setInputIdGamer(e.target.value);
    }

    const inputIdGameOnChange = (e) => {
        setInputIdGame(e.target.value);
    }

    const handleCreateRoom = async() => {

        if( !inputIdGamer || !select){
            console.log('No se ingreso algo');
            return;
        }

        await createRoom({idGame: select, ndPlayer: inputIdGamer})
        .then(n => 
            history.push(`/board/${select}`),
            setInputIdGamer(''),
            setSelect(''),
            )
        
        localStorage.setItem('secondPlayer',JSON.stringify(inputIdGamer));
        console.log(select, inputIdGamer);
        
    }

    const handleJoin = () => {

        if(!inputIdGame){
            console.log('No se ingreso el id');
        }
        console.log(inputIdGame);

        setInputIdGame('');

    }

    return (
        <div className="col shadow-sm p-3 mb-5 bg-white rounded m-2">
                    
        <div>

            <div className="text-right">
                <strong>My id:</strong> <samp>{ JSON.parse(localStorage.getItem('id'))}</samp> 
            </div>

            <div className="form-group h-100 mt-5 ">
                <input
                 value={inputIdGamer}
                 onChange={ inputOnChange }
                 type="text" 
                 className="form-control w-75 m-3" 
                 placeholder="Player two id"/>
            </div>

            <button onClick={handleCreateRoom} type="button" className="btn btn-success btn-lg btn-block w-75 m-3 mt-3">Add second player</button>

            <div className="form-group h-100 mt-5 ">
                <input 
                type="text" 
                value = { inputIdGame }
                onChange = { inputIdGameOnChange }
                className="form-control w-75 m-3" 
                placeholder="Game id"/>
            </div>

            <button onClick={handleJoin} type="button" className="btn btn-success btn-lg btn-block w-75 m-3 mt-3">Join or watch game</button>

            <button type="button" className="btn btn-warning btn-lg btn-block w-75 m-3 mt-5">Scoreboard</button>
            <button onClick={handleLogOut} type="button" className="btn btn-danger btn-lg btn-block w-75 m-3 mt-3">Log Out</button>
        </div>
    </div>
    )
}
