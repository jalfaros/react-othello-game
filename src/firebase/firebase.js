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
}

const firebase = new Firebase();

export default firebase;