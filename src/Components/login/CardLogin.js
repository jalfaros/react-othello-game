import React, { useContext, useState } from 'react'
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../Hooks/useForm';
import { types } from '../../types/types';
import firebas from '../../firebase/firebase';
import { FcGoogle } from "react-icons/fc";
import { savePlayerInfo } from '../../helpers/getInitialGame';

export const CardLogin = () => {

    //const history = useHistory();

    const { dispatch } = useContext(AuthContext);

    const [condition, setCondition] = useState(false);

    const [{email, password}, handleInputChange] = useForm({
        email: '',
        password: ''
    }); 

    async function signIn(){
        try{
            await firebas.login(email, password).then( ({user}) => {

                localStorage.setItem('id', JSON.stringify(user.uid));
                dispatch({
                    type: types.login,
                    payload: {
                        name: user.displayName
                    }
                })
            })

        }catch(error){
            console.error('Error with the autentication with the user', error.message);
            setCondition(error.message);
        }

    }

    async function signInWithGoogle(){
        try{
            await( firebas.loginWithGoogle())
            .then((result) => {

                var user = result.user;

                localStorage.setItem('id', JSON.stringify(user.uid));

                savePlayerInfo({uid: user.uid, displayName: user.displayName, email: user.email}).then();

                dispatch({
                    type: types.login,
                    payload: {
                        name: user.displayName
                    }
                })
        })
    }catch(error){
        console.log(error);
    }

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim().length <=1 || password.trim().length <=1){
            return;
        }
        
        signIn();
    }

    return (

        <div className="text-center ">

            <h1>Welcome <small> to Othello</small>
            </h1>
            <hr />
            <div className="shadow mb-5 bg-white rounded mt-5 p-3 text-center widthLogin mx-auto">
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

                    {condition &&
                      <div className="alert alert-danger mt-2" role="alert">
                        {condition}
                      </div>
                    }

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

                        
                    <button onClick={signInWithGoogle} className="btn btn-outline-dark w-50 m-3">
                        <FcGoogle /> Login with Google
                    </button>
                    </div>

                </form>
            </div>
        </div>

    )
}
