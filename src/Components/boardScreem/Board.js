import React, { useState } from 'react'
import { getInitialGame, postClickGame } from '../../helpers/getInitialGame';

import {useFetch} from '../../Hooks/useFetch'
import { SquareBoard } from './SquareBoard';
import { useAlert } from 'react-alert'
export const Board= () => {

    const idGame = 'dIwEQtNLRODq9P1G3SP1';
    
    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    const getGame = () => {

        getInitialGame( idGame )
        .then(async m => {
            setstate({
                data: await m.game,
                loading: false
            });
            console.log(m,'m');
        })
        .catch( error => {
            console.log(error);
        });

    }

    const { data } = useFetch(idGame);

    const alert = useAlert();

    const getGamee = () =>{

            console.log('Entreeeeeeeeeee');
            setstate({data: data, loading: false});    }

 
    const handleClick = (id, item) =>{
        
        if(item){
            alert.show('No puede jugar en una casilla llena',{
                type: 'info',
                timeout: 1000,
            })
            return;
        }

        console.log('xPlay', state.data.xPlay);

        if(state.data.xPlay){

            postClickGame( {idGame: idGame, boardGame: state.data.boardGame, xPlay: state.data.xPlay, clickedPosition: id} )
            
            .then(async m => {
                await (
                    getInitialGame( idGame )
                    .then(async m => {
                        setstate({
                            data: await m.game,
                            loading: false
                        });
                        console.log(m,'m');
                    })
                    .catch( error => {
                        console.log(error);
                    }));
            }).catch(Error => {
                console.log(Error);
                })

                while(state.data.xPlay){
                    //getGame();
                    setTimeout( getGamee(), 5000 )

                }


        }else{
            
            postClickGame( {idGame: idGame, boardGame: state.data.boardGame, xPlay: state.data.xPlay, clickedPosition: id} ).then(async m => {
               
                await (
                    getInitialGame( idGame )
                    .then(async m => {
                        setstate({
                            data: await m.game,
                            loading: false
                        });
                        console.log(m,'m');
                    })
                    .catch( error => {
                        console.log(error);
                    }));

            }).catch(Error => {
            console.log(Error);
            })

          
            //setTimeout( getGamee(), 5000 )

            while(!state.data.xPlay){
                //getGame();
                setTimeout( getGamee(), 2000 )

            }
                
                

        }

    }

    return (
        <div className="container ">
            <h1>Board Screen</h1>

            <button className="btn btn-primary" onClick={getGame}>
                Start Game
            </button>
            
            {
            (state.data.boardGame)
            &&
            

            <div className=" width mx-auto shadow-lg p-3 bg-white rounded">
                {(state.data.xPlay)
                    ?(<span className="nav-item nav-link text-info">
                       Playing White: <strong>Player 1</strong>
                    </span>)

                    :(<span className="nav-item nav-link text-info">
                        Playing Black: <strong>Player 2</strong>
                      </span>)
                    }
                <div className="text-center board mx-auto m-2 ">

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
                    )

                    }

                </div>
            </div>
            }

        </div>
    )
}
