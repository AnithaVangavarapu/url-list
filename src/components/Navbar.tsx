import { useContext } from "react";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { Button } from "../commonComponents";
const Navbar = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { setIsAuth } = contextData;
  const handleLogin = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsAuth(false);
  };
  return (
    <div className="flex justify-between border p-5 bg-gradient-to-r from-blue-950 to-blue-800">
      <p className="text-[24px] font-medium text-white">Dashboard</p>
      <Button label="Logout" onClick={handleLogin} type="button" />
    </div>
  );
};

export default Navbar;
