import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//  para loguearse y registrarse con google
export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const user = result.user;
        console.log(user);

        const { uid, email, photoURL, displayName } = result.user;

        return {
            ok: true,
            user: {
                uid,
                email,
                photoURL,
                displayName
            }
        }

    } catch (error) {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error)

        return {
            ok: false,
            errorMessage,
        }
    }

}

//  para registrar al usuario con email
export const registerWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        //  actulaizar en firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            user: {
                uid,
                photoURL,
                email,
                displayName,
            }
        }

    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }
    }
}


export const loginWithEmailAndPassword = async({ email, password }) => {
    
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        
        return { 
            ok: true,
            user: resp.user
        }

    } catch( error ){
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut()
}