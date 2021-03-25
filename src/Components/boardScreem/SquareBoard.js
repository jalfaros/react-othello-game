import React from 'react'
import { useAlert } from 'react-alert';
import { postClickGame } from '../../helpers/getInitialGame';

export const SquareBoard = ({id, item, state, localPlayer, idOfGame}) => {

    const alert = useAlert();

    const handleClick = (id, item) =>{
  
        if(item){

            alert.show('No puede jugar en una casilla llena',{
                type: 'info',
                timeout: 1000,
            })
            return;
            
        }else if( state.data.currentPlayer === localPlayer ){

            var nextPlayer = '';
            
            localPlayer === state.data.player2 ? nextPlayer = state.data.player1 : nextPlayer = state.data.player2;

            postClickGame( {idGame: idOfGame, boardGame: state.data.boardGame, xPlay: state.data.xPlay, clickedPosition: id, currentPlayer: nextPlayer} )
            .then(async m => {  
                console.log(m,'Jugada realizada');
            }).catch(Error => {
                console.log(Error);
            })
        }
          
    }

    return (
        <>
             <div className="square border btn-success" onClick={() => handleClick(id, item)}>
                
               {(item === 'X' || state.data.boardGame === 'X')
               &&
               <span className="text-white">
                    &#9679;
                </span>
                }

                {(item === 'O' || state.data.boardGame === 'O')
               &&
               <span className="text-dark">
                    &#9679;
                </span>
                }
                            
            </div>
        </>
    )
}
