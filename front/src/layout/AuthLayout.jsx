import { Outlet, Navigate } from "react-router-dom";
import { useMyContext } from "../state/StateProvider";

export const AuthLayout = () => {
  const { state } = useMyContext();
  // console.log(state);
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
