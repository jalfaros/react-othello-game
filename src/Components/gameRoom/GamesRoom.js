import React from 'react'
import { Navbar } from '../ui/Navbar'


export const GamesRoom = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-5" >
                <div className="card" >

                    <div className="card-header" style={{ textAlign: 'center' }} >
                        <h4> <strong>Game Room</strong> </h4>
                    </div>

                    <div card-body>
                        <div className="row">

                            <div className="col-sm" >
                                <div className="card mt-3">
                                    <div className="card-header" style={{ textAlign: 'center' }} >
                                        <strong> Reversi </strong>
                                    </div>

                                    <div className = "card-body" style = {{ textAlign : 'center' }} >
                                        <img src = "https://upload.wikimedia.org/wikipedia/commons/2/20/Othello-Standard-Board.jpg" 
                                            style = {{ width: '400px', height: '300px' }}
                                        />
                                    </div>

                                    <div className = "card-footer" style = {{ textAlign: 'center' }}>
                                        <button className = "btn btn-outline-dark">
                                            Play game...
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm" >
                                <div className="card mt-3">
                                    <div className="card-header" style={{ textAlign: 'center' }} >
                                        <strong> More games ... </strong>
                                    </div>

                                    <div className = "card-body" style = {{ textAlign : 'center' }} >
                                        <img src = "https://i1.wp.com/www.seniainternational.org/wp-content/uploads/2019/02/Coming-Soon-2-1.png?fit=1000%2C816&ssl=1" 
                                            style = {{ width: '400px', height: '300px' }}
                                        />
                                    </div>
                                    
                                </div>
                                <div className = "card-footer" style = {{ textAlign: 'center' }}>
                                        <button className = "btn btn-dark" disabled>
                                            Play game
                                        </button>
                                    </div>
                            </div>

                            


                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
