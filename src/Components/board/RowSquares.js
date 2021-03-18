import React, { useState } from 'react'
import { Square } from './Square'

export const RowSquares = ({id, item, array, state, setState}) => {

    const [data, setData] = useState({
        touched: false
    }); 


    return (
        < >
            {/* {(() => {
                const squares = [];
                for (let i = 0; i < 64; i++) {
                    squares.push(<Square 
                                    key     ={i}
                                    data    = {data} 
                                    setData = {setData}/>);}
                return squares;
            })()}
     */}
     <Square
                                    data    = {data} 
                                    setData = {setData}
                                    id      = {id}
                                    item    = {item}
                                    array   = {array}
                                    state   = {state}
                                    setState= {setState}
                                     />
            
        </>

    )
}
