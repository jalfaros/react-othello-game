import React, { useEffect, useState } from 'react'
import { useFetch } from '../../Hooks/useFetch'
import { RowSquares } from './RowSquares'

export const BoardScreen = () => {

    const idGame = '9DYfq3DpZbwHtnJOGZ9i';

    const url  = `http://localhost:4000/getGame?idGame=${encodeURI(idGame)}`;
    const {data} = useFetch( url );
    let array;

    const [state, setState] = useState(array);

    if(data){
        //console.log(data.game.boardGame);
        array = data.game;
        //console.log(array);
    }



    useEffect(() => {
        console.log('Aqui');
    }, [state])


    return (
        <div className="container ">
            <h1>Board Screen</h1>

            <div className=" width mx-auto shadow-lg p-3 bg-white rounded">
                <div className="text-center board mx-auto m-2 ">

                    {(data)
                    &&
                    array.boardGame.map(
                        (item,i) => (

                            <RowSquares 
                                key     ={i}
                                id      ={i}
                                item    ={item}
                                array   ={array}
                                state   ={state}
                                setState={setState}
                            />
                        )
                    )

                    }

                </div>
            </div>

        </div>
    )
}
