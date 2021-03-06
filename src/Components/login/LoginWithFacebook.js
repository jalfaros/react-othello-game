import React from 'react'
import FacebookLogin from 'react-facebook-login';


export const LoginWithFacebook = ({responseFacebook}) => {
    return (
        <FacebookLogin
        appId="867266700725610"
        autoLoad={false}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook} 
        icon="fa-facebook"/>
    )
}
