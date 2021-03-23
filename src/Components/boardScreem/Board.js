import React, {useState } from 'react'
import { getInitialGame, postClickGame } from '../../helpers/getInitialGame';

//import {useFetch} from '../../Hooks/useFetch'
import { SquareBoard } from './SquareBoard';
import { useAlert } from 'react-alert'

export const Board= () => {

    const idGame = '0imhdgxZQ39VzRGrGcwa';

    const [state, setstate] = useState({
        data:[],
        loading: true
    });

    //const { data, loading } = useFetch(idGame);

    const GetGame = () => {

        

        // setstate({
        //     data: data,
        //     loading: loading
        // });
        // console.log(data,'m');

        getInitialGame( idGame )
        .then(async m => {
            setstate({
                data: await m.game,
                loading: false
            });
        })
        .catch( error => {
            console.log(error);
        });
    }

    const myFuntion = async () => {

        GetGame();
        await setTimeout(async function(){
            // if(state.data.xPlay == state2){
            //     console.log('Salido');
            //     return;
            // }else{
            //   myFuntion();
            // }
            await GetGame;
            myFuntion();
        }, 3000)
    }

    //const { data } = useFetch(idGame);

    const alert = useAlert();

    const handleClick = (id, item) =>{
        
        if(item){
            alert.show('No puede jugar en una casilla llena',{
                type: 'info',
                timeout: 1000,
            })
            return;
        }

        //let test = state.data.xPlay;

        postClickGame( {idGame: idGame, boardGame: state.data.boardGame, xPlay: state.data.xPlay, clickedPosition: id} )
            .then(async m => {  
                console.log(m,'Jugada realizada');;
            }).catch(Error => {
                console.log(Error);
            })
                            
        }

    return (
        <div className="container ">
            <h1>Board Screen</h1>

            <button className="btn btn-primary" onClick={myFuntion}>
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
