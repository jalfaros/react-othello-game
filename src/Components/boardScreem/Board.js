import React, { useState } from 'react'
import { getInitialGame, postClickGame } from '../../helpers/getInitialGame';

import {useFetch} from '../../Hooks/useFetch'
import { SquareBoard } from './SquareBoard';

export const Board= () => {

    const idGame = 'DWttCk5sgXnoVU00WkrV';
    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    const { data } = useFetch(idGame);

    let array;
    const getGame = () =>{
   
            setstate({data: data, loading: false});
            array = data;
            console.log(array);
    }

 
    const handleClick = (id, item) =>{

        array = state;
        
        if(item){
            console.log('Seleccione una opcion sin marcar');
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

            array.data.boardGame[id] = 'X';

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

            array.data.boardGame[id] = 'O';
            //array.data.xPlay = !array.data.xPlay;

        }

        


    }

    return (
        <div className="container ">
            <h1>Board Screen</h1>

            <button className="btn btn-primary" onClick={getGame}>
                Start Game
            </button>
            
            {
            (!state.loading)
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

                {console.log(array, 'El map')}
                    {
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
