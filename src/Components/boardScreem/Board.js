import React, {useState } from 'react'
import {useFetch} from '../../Hooks/useFetch'
import { SquareBoard } from './SquareBoard';

export const Board= () => {

    const idGame = '9DYfq3DpZbwHtnJOGZ9i';
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

        console.log('Sirve', id);

        if(array.data.xPlay){

            //item = 'X';

            array.data.boardGame[id] = 'X';

            array.data.xPlay = !array.data.xPlay;

            console.log(array.data.boardGame[id--], '-1', id);
            console.log(array.data.boardGame[id--], '-2', id);

             id = id + 2;
            if((array.data.boardGame[id--]) === 'X' && (array.data.boardGame[id--] === 'O')){
                console.log('Ajaaaaaaaaa');
                array.data.boardGame[id++] = 'X'
                console.log(id);

            }


        }else{
            array.data.boardGame[id] = 'O';
            array.data.xPlay = !array.data.xPlay;
            //item = 'O';

        }



        setstate({
            data: array.data, loading: false});

        console.log(array);
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
                <div className="text-center board mx-auto m-2 ">
                {console.log(array)}
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
