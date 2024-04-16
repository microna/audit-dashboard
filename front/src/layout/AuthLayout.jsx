import { Outlet, Navigate } from 'react-router-dom';
import { useMyContext } from '../state/StateProvider';

export const AuthLayout = () => {
   const { state } = useMyContext();

   if (!state.user) {
      return <Navigate to='/login' replace />;
   }
   if (state.user) {
      return <Navigate to='/' />;
   }

   return <Outlet />;
};
