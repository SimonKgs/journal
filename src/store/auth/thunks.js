//  thunks son acciones que se les hace el dispatch pero internamente tiene una tarea asincrona

import { async } from "@firebase/util";
import { signInWithGoogle, registerWithEmailPassword, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

//  para cambiar el status a cheking
export const chekingAuthentication = () => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}
//  para inicializar el registro con google
export const startGoogleSignIn = () => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result.user))
    }
}

//  para inicializar el registro con email
export const startCreatingUserWithEmailAndPassword = ({ password, email, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, displayName, email }));

    }
}


export const startLoginWithEmailAndPassword = ({ email, password }) => {


    return async( dispatch ) => {
       
        dispatch(checkingCredentials())
       
        const { ok, user, errorMessage } = await loginWithEmailAndPassword({ email, password })
        
        if (!ok) return dispatch(logout({ errorMessage }));
        
        const { uid, displayName, photoURL } = user;

        dispatch(login({ uid, photoURL, displayName, email }));        

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
} 