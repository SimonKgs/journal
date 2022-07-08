import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startUpdatingNote, startUploadingFiles } from '../../store/journal/thunks'

import Swal from 'sweetalert2'
// import 'sweetalert2/dist/sweetalert2.css'

import { ImageGalery } from '../components'

export const NoteView = () => {

  const dispatch = useDispatch()

  const { active: note, isSaving, messageSaved } = useSelector( state => state.journal)

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo( () => {
    const newDate = new Date( date )

    return newDate.toUTCString();

  }, [date]);


  const fileInputRef = useRef();

  useEffect(() => {
      dispatch( setActiveNote(formState) )
  }, [formState])
  

  useEffect(() => {
    if ( messageSaved.length > 0){
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])
  

  const onSaveNote = () => {

    dispatch( startUpdatingNote() )
  }

  const onFileInputChange = ( { target } ) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles( target.files ))
  }

  const onDelete= () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems={'center'} sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight={'light'}> { dateString } </Typography>
        </Grid>
        <Grid item>
          <input
            type='file'
            multiple
            ref={ fileInputRef }
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
          />
          <IconButton
            color='primary'
            disabled={ isSaving }
            onClick={ () => fileInputRef.current.click() }
          >
            <UploadFileOutlined />
          </IconButton>
          <Button 
            disabled={ isSaving }
            color='primary' 
            sx={{ padding: 2}}
            onClick={ onSaveNote }  
          >
            <SaveOutlined sx={{ fontSize: 39, mr: 1}} />
            Guardar
          </Button>
        </Grid>

        <Grid container>
          <TextField 
            type='text'
            variant='filled'
            fullWidth
            placeholder='Ingrese un titulo'
            label='titulo'
            sx={{ border: 'none', mb: 1}}
            name='title'
            value={ title }
            onChange={ onInputChange }
          />
          <TextField 
            type='text'
            variant='filled'
            fullWidth
            multiline
            placeholder='¿Qué hay para hoy?'
            label='descripcion'
            minRows={10}
            name='body'
            value={ body }
            onChange={ onInputChange }
          />
        </Grid>
        <Grid container justifyContent='end'>
          <Button
            onClick={ onDelete }
            sx={{ mt: 2}}
            color='error'
          >
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>
        {/* Galeria imagenes */}
        <ImageGalery images={ note.imagesURLs } />
    </Grid>
  )
}
