import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //   id: 'asas',
        //   title: '',
        //   body: '',
        //   date: 12345,
        //   imageUrls: [],
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        noteUpdated: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if ( note.id === action.payload.id ){
                    return action.payload
                }
                return note;
            });

            state.messageSaved = `${action.payload.title} actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imagesURLs = [ ...state.active.imagesURLs, ...action.payload ];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            state.active = null
            state.notes = state.notes.filter( (note) => note.id !== action.payload );
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved == '';
            state.notes = [];
            state.active = null;
        }

    },
})
// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    clearNotesLogout,
    setPhotosToActiveNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    deleteNoteById,
} = journalSlice.actions