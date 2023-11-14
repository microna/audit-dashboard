import React from 'react';
import {Link} from 'react-router-dom'

import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch,useSelector } from 'react-redux';
import {logout ,selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if(window.confirm('Are you sure that you want to logout?')){
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Lucidica</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create Audit</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
