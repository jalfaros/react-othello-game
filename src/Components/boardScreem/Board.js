import React, {useEffect, useState } from 'react'
import { editSkipTurn, getInitialGame } from '../../helpers/getInitialGame';
import { useParams } from 'react-router-dom'
import { SquareBoard } from './SquareBoard';
import { UsersPlaying } from './UsersPlaying';
import { ButtonsOptions } from './ButtonsOptions';
import { useAlert } from 'react-alert';


export const Board= () => {
    const idOfGame                    = useParams().board_idGame;
    const idUser                      = JSON.parse(localStorage.getItem('id'));
    const [inGame, setInGame]         = useState(false);
    const [state, setState]           = useState({ data:[{boardGame: []}], loading: true });
    const [scoreBlack, setScoreBlack] = useState(2);
    const [scoreWhite, setScoreWhite] = useState(2);
    //const [nextPlayer, setNextPlayer] = useState('');
    const alert                       = useAlert();


    useEffect(() => {
        getInitialGame( idOfGame )
        .then(async m => {
            if(!m.game)return;
            setState({
                data: await m.game,
                loading: false
            });
        })
    }, [idOfGame])

    const getGame = () => {
        getInitialGame( idOfGame )
        .then(async m => {
            console.log(m,'peticion');
            await setScoreWhite( m.game.score.player1);
            await setScoreBlack( m.game.score.player2);

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

    const skipTurn = async() => {
        if(idUser !== state.data.currentPlayer) {
            alert.show('Wait your turn!',{
                type: 'error',
                timeout: 3000,
            })
            return;}
        
        var nextPlayer = '';
            
        state.data.currentPlayer === state.data.player2.playerId ? nextPlayer = state.data.player1.playerId : nextPlayer = state.data.player2.playerId;


        editSkipTurn({idGame: idOfGame, xPlay: !state.data.xPlay, currentPlayer: nextPlayer})
        .then(response => console.log(response));
    }

    if(!inGame){
        setInGame(true);

        myFuntion();
    }

    return (
        <>
            <ButtonsOptions />

            <div className="container animate__animated animate__backInDown animate__delay-0s">
                {(state.data.boardGame !== undefined && !state.data.endedGame)
                ?
                    <div className="row">
                        <div className="col-8 shadow-none p-3 mb-5 bg-light rounded">
                            <div className="shadow-lg p-3 mb-5 bg-white rounded w-75 mx-auto">
                            <button onClick={skipTurn} className="btn btn-dark">
                                Skip turn
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Skip turn</span>
                            </button>
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
                                                idOfGame    ={idOfGame}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <UsersPlaying state={state} scoreBlack={scoreBlack} scoreWhite={scoreWhite}/>                   
                    </div>
                :   
                    (state.data.endedGame ?
                        (scoreWhite > scoreBlack ?
                        <div className = "shadow-lg p-3  bg-white rounded container">
                            <h3>Game over</h3>
                            <div className ="shadow-lg p-3  bg-white rounded container">
                                <span className="nav-item nav-link text-info">
                                <h4><strong>Winner</strong></h4>
                                </span>

                                <div className="card bg-light mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                    <div className="card-header"> Player1: <strong>{state.data.player1.playerName}</strong></div>
                                    <div className="card-body bg-white">
                                        <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                                        <p className="card-text">Score: {scoreWhite}</p>
                                    </div>
                                </div>

                            </div>

                            <div className ="shadow-lg p-3 mt-3  bg-white rounded container">
                                <span className="nav-item nav-link text-info">
                                <h4><strong>Loser</strong></h4>
                                </span>

                                <div className="card bg-light mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                    <div className="card-header"> Player2: <strong>{state.data.player2.playerName}</strong></div>
                                        <div className="card-body bg-dark">
                                            <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                                            <p className="card-text text-white">Score: {scoreBlack}</p>
                                        </div>                          
                                </div>

                            </div>

                        </div>
                        :
                        (scoreWhite < scoreBlack ?
                        
                            <div className = "shadow-lg p-3  bg-white rounded container">

                                <div className ="shadow-lg p-3  bg-white rounded container">
                                    <span className="nav-item nav-link text-info">
                                    <h4><strong>Winner</strong></h4>
                                    </span>

                                    <div className="card bg-light mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                        <div className="card-header"> Player2: <strong>{state.data.player2.playerName}</strong></div>
                                            <div className="card-body bg-dark">
                                                <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                                                <p className="card-text text-white">Score: {scoreBlack}</p>
                                            </div>                          
                                    </div>

                                </div>

                                <div className ="shadow-lg p-3 mt-3  bg-white rounded container">
                                    <span className="nav-item nav-link text-danger">
                                    <h4><strong>Loser</strong></h4>
                                    </span>
                                    
                                    <div className="card bg-light mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                        <div className="card-header"> Player1: <strong>{state.data.player1.playerName}</strong></div>
                                        <div className="card-body bg-white">
                                            <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                                            <p className="card-text">Score: {scoreWhite}</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            
                        :

                        <div className = "shadow-lg p-3  bg-white rounded container">
                            <span className="nav-item nav-link text-info">
                                <h4><strong>Ties</strong></h4>
                            </span>
                        <div className ="shadow-lg p-3  bg-white rounded container card-group">

                            <div className="card bg-light m-3 mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                <div className="card-header"> Player2: <strong>{state.data.player2.playerName}</strong></div>
                                    <div className="card-body bg-dark">
                                        <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                                        <p className="card-text text-white">Score: {scoreBlack}</p>
                                    </div>                          
                            </div>

                            <div className="card bg-light m-3 mx-auto  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                                <div className="card-header"> Player1: <strong>{state.data.player1.playerName}</strong></div>
                                <div className="card-body bg-white">
                                    <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                                    <p className="card-text">Score: {scoreWhite}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                        
                        )
                        )

                    :
                    
                        <div className="m-3 mt-5 shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className="alert alert-warning mt-5 animate__animated animate__backInRigth " style={{ textAlign: 'center' }} >
                            <span>The id of the game is invalid</span>
                            </div>
                        </div>
                    )

                }

            </div>
        </>       
    )

    
}
