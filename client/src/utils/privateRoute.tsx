import { Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = () => {
  
  //TODO - Melhorar isso utilizando userService.authenticate
  const isAuthenticated = !!localStorage.getItem("Authorization");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};

export default PrivateRoute;
