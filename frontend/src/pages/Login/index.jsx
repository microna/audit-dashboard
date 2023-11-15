import React from "react";
import { useForm } from "react-hook-form"; //формы для react'a
import { useDispatch } from 'react-redux'; //для отправки async action от сюда
import { useSelector } from 'react-redux'; //вытаскиваем state


import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate, NavLink} from "react-router-dom"; //тоже самое что Link только сделает автопереход (а не по клику)

export const Login = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();


 
  //register регистрирует поля логин/пароля
  //handleSubmit выполнит onSubmit только в том случае если мыло и пароль провалидировались успешно
  //useForm внутри себя уже хранит state
  //setError ошибки из бекенда
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: { //изначальное значение
      email: 'test@test.test',
      password: '12345'
    },
    mode: 'onChange' //валидация сработает только после отправки
  })

  const onSubmit = async (values) => { //выполнится если валидация прошло корректно

    //redux toolkit с бекенда вернул action и пейлоад (и так можно понять авторизован или нет и сделать что-то)
    const data = await dispatch(fetchAuth(values))//данные с формы диспатчим в reducer и оттуда в бекенд
    console.log('data', data)


    if (!data.payload) { //если undefined прийдет
      return alert('error login', setError)
    }

    //если есть token в data.payload (на всякий случай)
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token) //сохраним его в localStorage
    } else {
      alert('failed to login!')
    }

  }

  console.log(errors, isValid) //isValid ответит на валидная форма или нет. errors покажет какие ошибки

  console.log('isAuth', isAuth)

  if (isAuth) {//если все state true (в том числе и логин то пойдем на главную)
    return <Navigate to='/' />
  }

  return (
    // <Paper elevation={1} classNamees={{ root: styles.root }}>
    //   <p classNameName="text-blue-500">
    //     Login
    //   </p>
    //   <form onSubmit={handleSubmit(onSubmit)}> 
    //     <TextField
    //       classNameName={styles.field}
    //       label="E-Mail"
    //       type="email" //валидация браузера
    //       error={Boolean(errors.email?.message)} //будет красным подсвечиваться если ошибка
    //       //helperText выводит текст ошибки
    //       helperText={errors.email?.message}//если отсутствует текст ошибки то не нужно его вытаскивать
    //       {...register('email', { required: 'Enter the mail' })}
    //       fullWidth
    //     />
    //     <TextField 
    //       classNameName={styles.field} 
    //       label="Password" 
    //       error={Boolean(errors.password?.message)} //будет красным подсвечиваться если ошибка
    //          //helperText выводит текст ошибки
    //       helperText={errors.password?.message}//если отсутствует текст ошибки то не нужно его вытаскивать 
    //        {...register('password', { required: 'Enter the password' })}
    //      fullWidth />
    //     <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
    //       Login
    //     </Button>
    //   </form>
    // </Paper>

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  label="E-Mail"
              error={Boolean(errors.email?.message)} 
              helperText={errors.email?.message}
              {...register('email', { required: 'Enter the mail' })}
              />
            </div>
            <div>
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" classNameName={styles.field} 
              label="Password" 
              error={Boolean(errors.password?.message)} 
              helperText={errors.password?.message}
              {...register('password', { required: 'Enter the password' })} />
            </div>
            <button disabled={!isValid} type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <NavLink  to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink >
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
