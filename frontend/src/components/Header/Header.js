import {MDCRipple} from '@material/ripple';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; //для стейтов
import { useDispatch } from 'react-redux'; //для экшенов
import React from 'react';

import { selectIsAuth, logout } from '../../redux/slices/auth'; //проверит auth state на true или false 
import styles from './Header.module.scss';


export const Header = () => {

    const isAuth = useSelector(selectIsAuth); //проверит auth state на true иначе false если хоть один false

    const dispatch = useDispatch(); //для экшенов

    //функция выйти, переводим state в null
     const onClickLogout = () => {
      if (window.confirm('Are you sure want to logout?')) {
        dispatch(logout())
        window.localStorage.removeItem('token') //удалим токен что бы разлогиниться
      }
     }
       
     return (
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
            <div>Main</div>
            </Link>
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-post">
                    <Button variant="contained">Write a post</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Exit
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Create account</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
      
};

    

