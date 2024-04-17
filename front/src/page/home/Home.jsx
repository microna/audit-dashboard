import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useMyContext } from '../../state/StateProvider';
import { TableList } from './components/TableList';

export const Home = () => {
   const { state, dispatch } = useMyContext();
   const navigate = useNavigate();

   return (
      <div className='text-black mt-20'>
         <button
            onClick={() => {
               navigate('dashboard');
            }}
         >
         </button>
         <TableList />
      </div>
   );
};
