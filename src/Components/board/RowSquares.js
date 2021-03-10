import React, { useState } from 'react'
import { Square } from './Square'

export const RowSquares = ({id}) => {

    const [data, setData] = useState({
        score  : 0,
        color  : 'black',
        touched: false
    });

    return (
        
        < >

            <Square 
            
            data    = {data} 
            setData = {setData}
            id      = {id}
            />
            
        </>

    )
}
