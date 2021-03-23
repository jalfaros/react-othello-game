import React from 'react'

export const SquareBoard = ({id, item ,handleClick, state}) => {


    return (
        <>
             <div className="square border btn-success" onClick={() => handleClick(id, item)}>

                {/* {console.log(state.data.boardGame)} */}

                
               {(item === 'X' || state.data.boardGame === 'X')
               &&
               <span className="text-white">
                    &#9679;
                </span>
                }

                {(item === 'O' || state.data.boardGame === 'O')
               &&
               <span className="text-dark">
                    &#9679;
                </span>
                }
                            

            </div>
        </>
    )
}
