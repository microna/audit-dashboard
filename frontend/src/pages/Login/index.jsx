import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


import {useForm} from 'react-hook-form'


import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  console.log(dispatch)

  const{register, handleSubmit, setErorr, formState:{ errors, isValid}} = useForm({
    defaultValues: {
      email: 'test2@test.com',
      password: '12345'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload){
      return  alert('cannot authorize')
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
      Log in
      </Typography>
     <form onSubmit={handleSubmit(onSubmit)}>
     <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email',{required: 'Type your Email'})}
        type="email"
        fullWidth
      />
      <TextField className={styles.field} label="Password"
        {...register('password',{required: 'Type your Password'})}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
      fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Login
      </Button>
     </form>
    </Paper>
  );
};
