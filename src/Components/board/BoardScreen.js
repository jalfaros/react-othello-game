import React from 'react'
import { RowSquares } from './RowSquares'

export const BoardScreen = () => {

    return (
        <div className="container ">
            <h1>Board Screen</h1>

            <div className=" width mx-auto shadow-lg p-3 bg-white rounded">
                <div className="text-center board mx-auto m-2 ">

                    {(() => {
                    const squares = [];

                        for (let i = 0; i < 64; i++) {
                            squares.push(<RowSquares 
                                key    ={i}
                                id     ={i}/>);
                        }

                        return squares;
                    })()}

                </div>
            </div>

        </div>
    )
}
