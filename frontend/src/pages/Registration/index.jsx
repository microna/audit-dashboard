import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom'

import {useForm} from 'react-hook-form'

import styles from './Login.module.scss';

import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  console.log(dispatch)

  const{register, handleSubmit, setErorr, formState:{ errors, isValid}} = useForm({
    defaultValues: {
      fullName: 'User123',
      email: 'user123@test.com',
      password: '12345'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if(!data.payload){
      return  alert('cannot register')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    } 
  }



  if(isAuth){
    return<Navigate to='/' />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
      Create Account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
      error={Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {...register('fullName',{required: 'Type your username'})}
      className={styles.field} label="Username" fullWidth />
      <TextField 
      error={Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      {...register('email',{required: 'Type your Email'})}
      className={styles.field} label="E-Mail" fullWidth />
      <TextField 
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password',{required: 'Type your password'})}
      className={styles.field} label="Password" fullWidth />
        <Button  disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Create Account
      </Button>
      </form>
    
    </Paper>
  );
};
