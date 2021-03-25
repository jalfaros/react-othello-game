import React from 'react'
import { useAlert } from 'react-alert';
import { postClickGame } from '../../helpers/getInitialGame';

export const SquareBoard = ({id, item, state, idOfGame}) => {

    const localPlayer = JSON.parse( localStorage.getItem('id') );
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
    }

    return (
        <>
             <div className="square border btn-success" onClick={() => handleClick(id, item)}>
                
               {(item === 'X')
               &&
               <span className="text-white">
                    &#9679;
                </span>
                }

                {(item === 'O')
               &&
               <span className="text-dark">
                    &#9679;
                </span>
                }
                            
            </div>
        </>
    )
}
