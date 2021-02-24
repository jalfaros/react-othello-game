import React from 'react'
import { Card } from 'react-bootstrap'
import { FormRegister } from './FormRegister'

export const CardRegister = () => {
    return (
        <>
            <Card className="card-conf">
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
        </>
    )
}

export default CardRegister
