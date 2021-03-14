import React from 'react'
import { Card } from 'react-bootstrap'
import { FormRegister } from './FormRegister'

export const CardRegister = () => {
    return (
        <>
            <div className="text-center m-5">
            <h1>Welcome <small> to Othello</small>
            </h1>
            <hr />
                <Card className="card-conf shadow-lg p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Card.Body>
                            <Card.Title>
                                <span style={{ textAlign: "center" }}>Othello's Register Form</span>
                            </Card.Title>
                                <div className="container mt-3">
                                    <FormRegister />
                                </div>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default CardRegister
