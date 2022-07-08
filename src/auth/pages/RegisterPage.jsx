import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"

import { useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'

//  estado inicial del form
const formData = {
  displayName: '',
  email: '',
  password: '',
}

//  objeto con las validaciones para el form
const formValidations = {
  email: [ (value) => value.includes('@') && value.includes('.'), 'Debe tener el formato de correo x@x.x'],
  password: [ (value) => value.length >= 6, 'El password debe tener 6 o mas caracteres'],
  displayName: [ (value) => value.length >= 2, 'El nombre debe tener 2 o mas caracteres'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  // para mostrar los errores despues de enviarse el formulario
  const [formSubmitted, setFormSubmitted] = useState(false);
  //  para mostrar el mensaje de error si algo falla en el form
  const { status, errorMessage } = useSelector( state => state.auth);
  //  para bloquear los botones si se esta esperando la resolucion de la peticion 
  const isChekingAuthentication = useMemo(() => status === 'cheking', [status]);

  const { 
    formState, 
    displayName, 
    email, 
    password, 
    isFormValid, 
    displayNameValid, 
    emailValid, 
    passwordValid, 
    onInputChange, 
    onCleanForm
  } = useForm( formData, formValidations );


  //  para registrar al usuario
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted( true )

    if (!isFormValid) return 

    dispatch( startCreatingUserWithEmailAndPassword(formState) )
  }

  return (
    <AuthLayout title='Register' >
      <h2>{ (!isFormValid && formSubmitted) && 'Formulario incorrecto'}</h2>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeInDown animate__faster'>
        <Grid container direction="column" >
          <Grid item mt={1} xs={12} sm={6}>
            <TextField
              value={displayName}
              onChange={onInputChange}
              name='displayName'
              label="Nombre completo"
              type='text'
              placeholder='Tu nombre'
              fullWidth
              error= { !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item mt={1} xs={12} sm={6}>
            <TextField
              value={email}
              onChange={onInputChange}
              name='email'
              label="Correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
              error= { !!emailValid && formSubmitted}
              helperText={ emailValid }
            />
          </Grid>
          <Grid item mt={1} xs={12} sm={6}>
            <TextField
              value={password}
              onChange={onInputChange}
              name='password'
              label="Contraseña"
              type='password'
              placeholder='******'
              fullWidth
              error= { !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
            <Grid 
              item 
              xs={12}
              display={ !errorMessage && 'none'}
            >
                <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item mt={2} xs={12}>
              <Button 
                type='submit' 
                variant="contained" 
                fullWidth
                disabled={ isChekingAuthentication }
              >
                Register
              </Button>
            </Grid>

            <Grid container direction='row' justifyContent='end' mt={2}>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>

    </AuthLayout>
  )
}
