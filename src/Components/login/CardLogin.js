import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../Hooks/useForm';
import { types } from '../../types/types';
import { LoginWithFacebook } from './LoginWithFacebook';



export const CardLogin = () => {


    const history = useHistory();

    const { dispatch } = useContext(AuthContext);

    const [{email, password}, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim().length <=1 || email.trim().length <=1){

            return;
        }

        const userLogin = {
            email,
            password,
        }
        console.log(userLogin);

        reset();

        //Aqui iria el nombre que me devuelve
        dispatch({
            type: types.login,
            payload: {
                name: 'Warner'
            }
        })
        history.replace('/')


    }

    const responseFacebook = (response) => {
        console.log(response);

        //Aqui cambiar el nombre por el que me devuelve la vara
        dispatch({
            type: types.login,
            payload: {
                name: response.name
            }
        })
        
        history.replace('/')

      }

    return (

        <div className="text-center m-5">
            <h1>Welcome <small> to Othello</small>
            </h1>
            <hr />
            <div className="widthLogin shadow mb-5 bg-white rounded  p-3 text-center mx-auto m-5 widthLogin">
                <form onSubmit={ handleSubmit }>
                    <span className="form-label">
                        <h3>Login</h3>
                    </span>

                    <div className="mb-3 m-3">
                        <input
                            className="form-control w-75 mx-auto"
                            type="email"
                            name="email"
                            required
                            onChange={ handleInputChange }
                            placeholder="Email"/>
                    </div>

                    <div className="mb-3 m-3">
                        <input
                            className="form-control w-75 mx-auto"
                            type="password"
                            name="password"
                            required
                            value={ password }
                            onChange={ handleInputChange }
                            placeholder="Password"/>
                    </div>

                    <div className="mb-3">
                        <div className="contact100-form-checkbox">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember-me"/>
                        <label className="form-check-label" >
                            Remember my username
                        </label>
                        </div>

                        <div>
                        <Link className="txt1" to="/register"> ¿Don't you have an account? </Link>
                        </div>

                        <div className="m-3">
                        <button  className="btn btn-success w-50">Sign In</button>
                        </div>
                    </div>

                    <div className="mb-3">

                        <LoginWithFacebook responseFacebook={ responseFacebook }/>
                        
                    </div>
                </form>
            </div>
        </div>

    )
}
