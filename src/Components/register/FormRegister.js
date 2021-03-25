import React, { useState } from 'react'
import { Button, Form,  Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router';
import firebase from '../../firebase/firebase';
import { useForm } from '../../Hooks/useForm';
import swal from 'sweetalert'

export const FormRegister = () => {

    const history = useHistory();

    const showSweet =  async ( icon, title ) => {
        swal({
            icon:   icon,
            title:  title,
            timer: 2000,
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        })
    }

    const [condition, setCondition] = useState(false);
    const [{userName, email, password}, handleInputChange] = useForm({
        userName: '',
        email: '',
        password: '',
    }); 

    async function saveInformation() {

            try{
                await firebase.regist(userName, email, password)

                showSweet( 'success', 'Registered Succesfully' );
                history.push('/ login');
            }catch(error){
                console.error('Error creating account', error.message)
                setCondition(error.message)

                showSweet('error', 'This account already exists');

            }
    }

    const handleBack = () =>{
        history.push('/login')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formValue)

        if(email.trim().length <=1 || password.trim().length <=5 || userName.trim().length <=1){

            return;
        }
        saveInformation()
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoComplete = "off" 
                        name="userName"
                        placeholder="Enter username"
                        onChange={handleInputChange} >

                    </Form.Control>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoComplete = "off" 
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}>

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
                    <div className = "mt-5" >
                        <Row style = {{ width: "15rem" }}>
                            <Col>
                                <Button     
                                        style = {{ marginRight: "3px" }}
                                        type="submit"
                                        variant="primary"
                                        block>
                                    Register
                                </Button>
                            </Col>

                            <Col >
                                <Button     
                                            
                                            variant="danger"
                                            block
                                            onClick={ handleBack }>
                                    Go back!
                                </Button>
                            </Col>

                        </Row>
                    </div>

                    {condition &&
                      <div className="alert alert-danger mt-2" role="alert">
                        {condition}
                      </div>
                    }
            </Form>
        </>
    )
}
