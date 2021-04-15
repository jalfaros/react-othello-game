import React, { memo } from 'react'
import { Player1 } from './Player1'
import { Player2 } from './Player2'

export const UsersPlaying = memo(({state, scoreBlack, scoreWhite}) => {
    console.log('Pintando los players');
    return (
        <>
            <div className="col shadow-none bg-light rounded ml-5 mx-auto">
                {(state.data.xPlay)
                ?(
                <> 
                    <Player1 state = { state } scoreWhite = { scoreWhite } scoreBlack = { scoreBlack } />
                </>
                
                )

                :(
                <> 
                    <Player2 state = { state } scoreWhite = { scoreWhite } scoreBlack = { scoreBlack } />
                </>
                )
                }
            </div>
            
        </>
    )
});