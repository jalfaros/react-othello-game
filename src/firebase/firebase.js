import app from 'firebase/app';
import 'firebase/auth'

import firebaseConfig from './config';

//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
    }

    //Registrar un usuario

    async regist(userName, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName: userName
        })

    }

    //Inicia sesion un usuario

    async login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cierra la sesion del usuario

    async logOut(){
        await this.auth.signOut();
    }


    //Login con facebook

    async loginFacebook(provider){
         return this.auth.signInWithPopup(provider);
    }

    
}

 const firebas = new Firebase();

 export default firebas;