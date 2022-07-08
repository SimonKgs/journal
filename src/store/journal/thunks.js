import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { useSelector } from "react-redux";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice"


export const startNewNote = () => {
    //  getState es un segundo argumento que aceptan los thunks y nos proporciona todo el stado almacenado del redux
    return async (dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        await setDoc( newDoc, newNote );
        // console.log( { newDoc, setDocResp} );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}


export const startLoadingNotes = () => {

    return async(dispatch, getState) => {


        const { uid } = getState().auth

        if ( !uid ) throw new Error('El usuario no existe');

        const notes = await loadNotes( uid )

        dispatch( setNotes(notes));
    }

}

export const startUpdatingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() )
 
        const { uid } = getState().auth
        const { active: note } = getState().journal

        //  borro el id de la nota para que no lo sobreescriba
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteToFirestore, { merge: true });

        dispatch( noteUpdated( note ));
    }
}


export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) )
        }

        const imagesURLs = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote(imagesURLs) );
    } 

}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ));
        
    }
}