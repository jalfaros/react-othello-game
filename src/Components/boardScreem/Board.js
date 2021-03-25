import React, {useContext, useEffect, useState } from 'react'
import { getInitialGame } from '../../helpers/getInitialGame';
import { useParams } from 'react-router-dom'
import { SquareBoard } from './SquareBoard';
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router';
import { UsersPlaying } from './UsersPlaying';
import { ButtonsOptions } from './ButtonsOptions';

export const Board= () => {

    const localPlayer = JSON.parse( localStorage.getItem('id') );
    const idOfGame    = useParams().board_idGame;

    const [inGame, setInGame]   = useState(false);
    const [state, setState]     = useState({ data:[], loading: true });
    
    const { dispatch } = useContext(AuthContext);
    const history      = useHistory();

    useEffect(() => {
        getInitialGame( idOfGame )
        .then(async m => {
    
            setState({
                data: await m.game,
                loading: false
            });
        })
    }, [idOfGame])

    const getGame = () => {
        getInitialGame( idOfGame )
        .then(async m => {
            console.log(m);
            setState({
                data: await m.game,
                loading: false
            });
        })
        .catch( error => {
            console.log(error);
        });
    }

    const myFuntion = () => {
         setTimeout(function(){
             getGame();
             myFuntion();
        }, 3000)
    }

    if(!inGame){
        setInGame(true);

        myFuntion();
    }

    return (
        <>
            <ButtonsOptions history={history} dispatch={dispatch} />

            <div className="container">
                {
                    (state.data.boardGame)
                    &&
                    <div className="row">
                        <div className="col-8 shadow-none p-3 mb-5 bg-light rounded">
                            <div className="shadow-lg p-3 mb-5 bg-white rounded w-75">
                                <div className="text-center board mx-auto m-2">
                                    {(state.data.boardGame)
                                        &&
                                    state.data.boardGame.map(
                                        (item,i) => (

                                            <SquareBoard 
                                                key         ={i}
                                                id          ={i}
                                                item        ={item}
                                                state       ={state}
                                                localPlayer ={localPlayer}
                                                idOfGame    ={idOfGame}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <UsersPlaying state={state}/>                   
                    </div>
                }
            </div>
        </>       
    )

    
}
