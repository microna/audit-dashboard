import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useMyContext } from '../../state/StateProvider';
import { TableList } from './components/TableList';

export const Home = () => {
   const { state, dispatch } = useMyContext();
   const navigate = useNavigate();

   return (
      <div className='text-black mt-20'>
         123
         {/* <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button> */}
         <button
            onClick={() => {
               navigate('dashboard');
            }}
         >
            Click me
         </button>
         {/* <TableList /> */}
      </div>
   );
};
