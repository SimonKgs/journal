import { useDispatch, useSelector } from 'react-redux'

import { Link as RouterLink } from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: '',
}
export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticated = useMemo(() => status === 'cheking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(chekingAuthentication());

    dispatch( startLoginWithEmailAndPassword( {email, password} ))

  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeInDown animate__faster'>
        <Grid container direction="column">
          <Grid item mt={1} xs={12} sm={6}>
            <TextField
              name='email'
              value={email}
              onChange={onInputChange}
              label="Correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
            />
          </Grid>
          <Grid item mt={2} xs={12} sm={6}>
            <TextField
              name='password'
              value={password}
              onChange={onInputChange}
              label="Contraseña"
              type='password'
              placeholder='******'
              fullWidth />
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
          <Grid 
              item 
              xs={12}
              display={ !errorMessage && 'none'}
            >
                <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item mt={2} xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                type='submit'
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item mt={2} xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography ml={1} >Google</Typography>
              </Button>
            </Grid>
            <Grid container direction='row' justifyContent='end' mt={2}>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
