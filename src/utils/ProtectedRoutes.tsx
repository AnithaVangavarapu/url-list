import { Navigate, Outlet } from "react-router-dom";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { useContext } from "react";
import { Navbar } from "../components";
const ProtectedRoutes = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuth, loading } = contextData;
  console.log(isAuth);
  if (loading) return;
  if (isAuth === false) return <Navigate to={"/signin"} replace />;
  return (
    isAuth && (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )
  );
};

export default ProtectedRoutes;
