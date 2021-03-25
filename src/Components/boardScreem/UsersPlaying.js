import React from 'react'

export const UsersPlaying = ({state}) => {
    return (
        <>
            <div className="col-4 shadow-none p-3 mb-5 bg-light rounded">
                {(state.data.xPlay)
                ?(<span className="nav-item nav-link text-info">
                    Playing White: <strong>Player 1</strong>
                </span>)

                :(<span className="nav-item nav-link text-info">
                    Playing Black: <strong>Player 2</strong>
                </span>)
                }
            </div>
            
        </>
    )
}
