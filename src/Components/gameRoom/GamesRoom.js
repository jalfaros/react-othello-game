import React from 'react'
import { Link } from 'react-router-dom'

export const GamesRoom = () => {
    return (
        <div className="text-white bg-dark">
            <div className ="text-success text-center">
                <h1>Games Room</h1>
                <hr/>
            </div>
            <div className="card-group">
                <div className="card m-5">
                    <img className="card-img-top" style={{height: 500}} src={"./images/othello.png"} alt="othello" /> 
                    
                    <div className="btn m-3">
                        <Link className="txt1" to="/login"> Play othello </Link>
                    </div>
                </div>

                <div className="card m-5">
                    <img className="card-img-top" style={{height: 500}} src={"./images/damas.jpg"} alt="damas chinas" />

                    <div className="btn m-3">
                        <Link className="txt1" to="/login"> Play damas </Link>
                    </div>

                </div>

            </div>

            <div className ="text-success text-center m-5">
                <h1>You are in the game room</h1>
                <hr/>
            </div>
        </div>
    )
}
