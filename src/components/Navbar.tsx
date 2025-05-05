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
    <div className="flex justify-between border h-[10%] bg-blue-950 py-2 px-3 items-center">
      <p className="text-[24px] font-medium text-white">Dashboard</p>
      <Button
        label="Logout"
        onClick={handleLogin}
        type="button"
        className="border-orange-400 bg-orange-400 text-[14px] w-20 max-h-6 rounded-[16px]"
      />
    </div>
  );
};

export default Navbar;
