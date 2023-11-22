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
      dataWithImage = {
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
    return <Navigate to='/' />
  }

  return (
    <section class=" dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"
                label="Full name"

                error={Boolean(errors.fullName?.message)} //будет красным подсвечиваться если ошибка
                //helperText выводит текст ошибки
                helperText={errors.fullName?.message}//если отсутствует текст ошибки то не нужно его вытаскивать
                {...register('fullName', { required: 'Enter the full Name' })}
                fullWidth
              />
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@email.com"
                label="E-Mail"
                type="email" //валидация браузера
                error={Boolean(errors.email?.message)} //будет красным подсвечиваться если ошибка
                //helperText выводит текст ошибки
                helperText={errors.email?.message}//если отсутствует текст ошибки то не нужно его вытаскивать
                {...register('email', { required: 'Enter the mail' })}

                fullWidth
              />
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                label="Password"
                type="password"
                error={Boolean(errors.password?.message)} //будет красным подсвечиваться если ошибка
                //helperText выводит текст ошибки
                helperText={errors.password?.message}//если отсутствует текст ошибки то не нужно его вытаскивать 
                {...register('password', { required: 'Enter the password' })}
                fullWidth />
              <button
                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
                Register
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>

  );
};
