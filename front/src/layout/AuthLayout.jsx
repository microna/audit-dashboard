import { Outlet, Navigate } from 'react-router-dom';
import { useMyContext } from '../state/StateProvider';

export const AuthLayout = () => {
   const { state } = useMyContext();

   if (!state.token) {
      return <Navigate to='/login' replace />;
   }

   return <Outlet />;
};
