import React from 'react'

export const UsersPlaying = ({state, scoreBlack, scoreWhite}) => {
    return (
        <>
            <div className="col-4 shadow-none bg-light rounded">
                {(state.data.xPlay)
                ?(
                <> 
                    <span className="nav-item nav-link text-info">
                        <h4><strong>Playing</strong></h4>
                    </span>
                    <div className="card bg-light  shadow-lg p-3  bg-white rounded" style={{maxWidth: 18+'rem'}}>
                        <div className="card-header"> <strong className="text-warning">Player 1</strong></div>
                        <div className="card-body">
                            <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                            <p className="card-text">Score: {scoreWhite}</p>
                        </div>
                    </div>

                    <span className="nav-item nav-link text-danger mt-5">
                        <h4><strong>Waiting Turn</strong></h4>
                    </span>

                    <div className="card bg-light mb-3 w-50" style={{maxWidth: 18+'rem'}}>
                        <div className="card-header"> <strong className="text-danger">Player 2</strong></div>
                        <div className="card-body bg-dark">
                            <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                            <p className="card-text text-white">Score: {scoreBlack}</p>
                        </div>
                    </div>

                </>
                
                )

                :(
                <> 
                    <span className="nav-item nav-link text-info">
                        <h4><strong>Playing</strong></h4>
                    </span>
                    <div className="card bg-light  shadow-lg p-3  bg-white rounded" style={{maxWidth: 18+'rem'}}>
                        <div className="card-header"> <strong className="text-warning">Player 2</strong></div>
                        <div className="card-body bg-dark">
                            <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                            <p className="card-text text-white">Score: {scoreBlack}</p>
                        </div>
                    </div>

                    <span className="nav-item nav-link text-danger mt-5">
                        <h4><strong>Waiting Turn</strong></h4>
                    </span>
                    
                    <div className="card bg-light mb-3 w-50" style={{maxWidth: 18+'rem'}}>
                        <div className="card-header"> <strong className="text-danger">Player 1</strong></div>
                        <div className="card-body">
                            <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                            <p className="card-text">Score: {scoreWhite}</p>
                        </div>
                    </div>


                </>
                )
                }
            </div>
            
        </>
    )
}
