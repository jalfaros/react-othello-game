import React, { useState } from 'react'
import { Button, Form,  Row, Col } from 'react-bootstrap'


export const FormRegister = () => {

    const [formValue, setFormValue] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
       

        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value

        })
    }

    const saveInformation = (e) => {
        e.preventDefault();
        console.log(formValue)
    }



    return (
        <>
            <Form onSubmit={saveInformation}>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoComplete = "off" 
                        name="username"
                        placeholder="Enter username"
                        onChange={handleInputChange} >

                    </Form.Control>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoComplete = "off" 
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={handleInputChange}>

                    </Form.Control>
                </Form.Group>
                    <div className = "mt-5">
                        <Row style = {{ width: "15rem" }}>
                            <Col>
                                <Button     style = {{ marginRight: "3px" }}
                                            type="submit"
                                            variant="primary"
                                            block>
                                    Register
                                </Button>
                            </Col>

                            <Col >
                                <Button     
                                            
                                            variant="danger"
                                            block>
                                    Go back!
                                </Button>
                            </Col>

                        </Row>
                    </div>
            </Form>
        </>
    )
}
