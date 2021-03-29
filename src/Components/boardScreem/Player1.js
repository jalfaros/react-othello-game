import React from 'react'

export const Player1 = ({state, scoreWhite, scoreBlack}) => {
    return (
        <>
            <span className="nav-item nav-link text-info">
                <h4><strong>Playing</strong></h4>
            </span>
            <div className="card bg-light  shadow-lg p-3  bg-white rounded container animate__animated animate__backInRight " style={{maxWidth: 18+'rem'}}>
                <div className="card-header"> <strong >Player 1</strong></div>
                <div className="card-body bg-white">
                    <h5 className="card-title"><strong>White</strong><span className="text-black">&#9679; </span></h5>
                    <p className="card-text">Score: {scoreWhite}</p>
                </div>
            </div>

            <span className="nav-item nav-link text-danger mt-5">
                <h4><strong>Waiting Turn</strong></h4>
            </span>

            <div className="card bg-white p-3 container animate__animated animate__backInRight" style={{maxWidth: 18+'rem'}}>
                <div className="card-header"> <strong >Player 2</strong></div>
                <div className="card-body bg-dark">
                    <h5 className="card-title text-white"><strong>Black</strong><span className="text-white">&#9679; </span></h5>
                    <p className="card-text text-white">Score: {scoreBlack}</p>
            </div>
        </div>
        </>
    )
}
