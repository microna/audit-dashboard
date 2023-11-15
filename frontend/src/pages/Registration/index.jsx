import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form"; //формы для react'a
import { useDispatch } from 'react-redux'; //для отправки async action от сюда
import { useSelector } from 'react-redux'; //вытаскиваем state
import { Navigate } from "react-router-dom"; //тоже самое что Link только сделает автопереход (а не по клику)


import axios from '../../axios'
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import styles from './Login.module.scss';


export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

  //avatar image upload
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const inputFileRef = React.useRef(null);
  const handleChangeFile = async (event) => {
    // console.log(event.target.files) //доступ к файлу

    //далее отправляем на бекенд
    try {
      const formData = new FormData(); //формат позволит отправлять файл на бекенд
      const file = event.target.files[0]; //доступ к файлу
      formData.append("image", file); //вшили картинку в формДата
      const { data } = await axios.post("/upload/avatars", formData); //data это вернется ответ
      setAvatarUrl(data.url);
      console.log(data.url)
    } catch (error) {
      console.log(error);
      alert("error upload image", error);
    }
  };
  const onClickRemoveImage = () => {
    setAvatarUrl(""); //delete image
  };

  

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isValid } } = useForm({
    defaultValues: { //изначальное значение
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange' //валидация сработает только после отправки
})

  const onSubmit = async (values) => { 

    let dataWithImage = {}
    if (avatarUrl) {
      dataWithImage =  {
        ...values,
        avatarUrl
      }
    }

    console.log(dataWithImage)
    
    const data = (avatarUrl ? await dispatch(fetchRegister(dataWithImage)) : await dispatch(fetchRegister(values)))
    console.log('values', data)

    if (!data.payload) { //если undefined прийдет
      return alert('error register')
    }

       //если есть token в data.payload (на всякий случай)
       if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token) //сохраним его в localStorage
      } else {
        alert('failed to register!')
      }

     
  }

  if (isAuth) {//если все state true (в том числе и логин то пойдем на главную)
    return <Navigate to='/'/>
  }

  return (
    <Paper elevation={1} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
      Create account
      </Typography>
      <div className={styles.avatar}>
       {!avatarUrl && <Avatar 
          sx={{ width: 100, height: 100 }} 
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"/>}
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {avatarUrl && (
        <>
       
          <IconButton aria-label="delete"
        
            onClick={onClickRemoveImage}
          >
           <DeleteIcon />
          </IconButton>
          <img
            className={styles.image}
            src={'http://localhost:4444'+avatarUrl}
            alt="Uploaded"
          />
        
        </>
      )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}> 
      <TextField  
          className={styles.field}
          label="Full name"
         
          error={Boolean(errors.fullName?.message)} //будет красным подсвечиваться если ошибка
          //helperText выводит текст ошибки
          helperText={errors.fullName?.message}//если отсутствует текст ошибки то не нужно его вытаскивать
          {...register('fullName', { required: 'Enter the full Name' })}
          fullWidth
        />
         <TextField
          className={styles.field}
          label="E-Mail"
          type="email" //валидация браузера
          error={Boolean(errors.email?.message)} //будет красным подсвечиваться если ошибка
          //helperText выводит текст ошибки
          helperText={errors.email?.message}//если отсутствует текст ошибки то не нужно его вытаскивать
          {...register('email', { required: 'Enter the mail' })}
          
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Password" 
          type="password"
          error={Boolean(errors.password?.message)} //будет красным подсвечиваться если ошибка
             //helperText выводит текст ошибки
          helperText={errors.password?.message}//если отсутствует текст ошибки то не нужно его вытаскивать 
           {...register('password', { required: 'Enter the password' })}
         fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Register
        </Button>
       
      </form>
    
    </Paper>
  );
};
