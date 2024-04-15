import { useState } from 'react';
import axios from '../api';
import { useMyContext } from '../state/StateProvider';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
   const { dispatch } = useMyContext();
   const [loginEmail, seLoginEmail] = useState();
   const [loginPassword, setLoginPassword] = useState();
   const [error, setError] = useState();
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      try {
         e.preventDefault();
         const body = { email: loginEmail, password: loginPassword };
         const result = await axios.post('/auth/login', body);
         if (!result.data) {
            setError(true);
         }
         console.log(result.data);
         // await dispatch({ type: "USER", payload: result.data });
         window.localStorage.setItem('token', result.data.token);
         //  navigate('/');
      } catch (e) {
         setError(true);
      }
   };

   return (
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
         <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
               <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Sign in to your account
               </h1>
               <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
                  <div>
                     <label
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Your email
                     </label>
                     <input
                        value={loginEmail}
                        onChange={(e) => seLoginEmail(e.target.value)}
                        type='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        label='E-Mail'
                     />
                  </div>
                  <div>
                     <label
                        htmlFor='password'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Password
                     </label>
                     <input
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                     />
                  </div>
                  <button
                     type='submit'
                     className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  >
                     Sign in
                  </button>
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                     Don’t have an account yet?{' '}
                  </p>
               </form>
               {error && <div>Erorr</div>}
            </div>
         </div>
      </div>
   );
};
