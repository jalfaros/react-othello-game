import app from 'firebase/app';
import 'firebase/auth'

import firebaseConfig from './config';

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

        //console.log( newUser);
        await newUser.user.updateProfile({
            displayName: userName
        })

        return newUser;
    }

    //Inicia sesion un usuario

    async login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Inicia con autenticacion de google

    async loginWithGoogle(){
        var provider = new app.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider);
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