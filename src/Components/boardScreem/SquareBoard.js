import React from 'react'
import { useAlert } from 'react-alert';
import { postClickGame } from '../../helpers/getInitialGame';

export const SquareBoard = ({id, item, state, idOfGame}) => {

    const idUser      = JSON.parse(localStorage.getItem('id'));
    const localPlayer = JSON.parse( localStorage.getItem('id') );
    const alert       = useAlert();

    const handleClick = (id, item) =>{

        if(idUser !== state.data.currentPlayer) {
            alert.show('Wait your turn!',{
                type: 'error',
                timeout: 3000,
            })
            return;}
        
  
        if(item){

            alert.show('You can not play in this position',{
                type: 'error',
                timeout: 3000,
            })
            return;
            
        }else if( state.data.currentPlayer === localPlayer ){

            var nextPlayer = '';
            
            localPlayer === state.data.player2.playerId ? nextPlayer = state.data.player1.playerId : nextPlayer = state.data.player2.playerId;

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
