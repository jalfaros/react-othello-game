import React, {useContext, useEffect, useState } from 'react'
import { getInitialGame, postClickGame } from '../../helpers/getInitialGame';
import { useParams } from 'react-router-dom'
import { SquareBoard } from './SquareBoard';
import { useAlert } from 'react-alert'
import { types } from '../../types/types';
import firebase from '../../firebase/firebase'
import { AuthContext } from '../../auth/AuthContext';
import { useHistory } from 'react-router';

export const Board= () => {

    


    const localPlayer = JSON.parse( localStorage.getItem('id') );


    const idOfGame = useParams().board_idGame;
    const { dispatch } = useContext(AuthContext);

    const history = useHistory();

    const [state, setState] = useState({
        data:[],
        loading: true
    });

    const [playing, setPlaying] = useState(false)

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

    const myFuntion = async () => {

       // if(playing) return;
        
        await setTimeout(async function(){

            await getGame;
            await myFuntion();
        }, 3000)
    }

    const alert = useAlert();

    const handleClick = (id, item) =>{

        
        if(item){

            console.log('Current player ', state.data.currentPlayer);
            console.log('Actual user', localPlayer);

            alert.show('No puede jugar en una casilla llena',{
                type: 'info',
                timeout: 1000,
            })
            return;
        }else if( state.data.currentPlayer === localPlayer ){

            var nextPlayer = '';
            
            if( localPlayer === state.data.player2 ){
                nextPlayer = state.data.player1;
            }else{
                nextPlayer = state.data.player2;
            }

            postClickGame( {idGame: idOfGame, boardGame: state.data.boardGame, xPlay: state.data.xPlay, clickedPosition: id, currentPlayer: nextPlayer} )
            .then(async m => {  
                console.log(m,'Jugada realizada');
            }).catch(Error => {
                console.log(Error);
            })

        }

        myFuntion();

          
    }

    const handleLogOut = () =>{
        setPlaying(true);
        dispatch({
            type: types.logout
        })
        firebase.logOut();
        

        history.replace('/login');
    }

    return (
        <>
            <div className="text-right">

                <button 
                    className="btn btn-outline-info m-2" 
                    onClick={ handleLogOut }
                    > Lobby
                </button> 
                
                <button 
                    className="btn btn-outline-info m-2" 
                    onClick={ handleLogOut }
                    > Logout
                </button> 
            </div>

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
                                            key     ={i}
                                            id      ={i}
                                            item    ={item}
                                            handleClick = {handleClick}
                                            state   ={state}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-4 shadow-none p-3 mb-5 bg-light rounded">
                        {(state.data.xPlay)
                        ?(<span className="nav-item nav-link text-info">
                            Playing White: <strong>Player 1</strong>
                        </span>)

                        :(<span className="nav-item nav-link text-info">
                            Playing Black: <strong>Player 2</strong>
                        </span>)
                        }
                    </div>
                </div>
                }
            </div>

        </>       
    )

    
}
