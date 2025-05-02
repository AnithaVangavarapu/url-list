import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { setIsAuth } = contextData;
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
      hd: "quadone.com",
    });
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      if (user?.email?.endsWith("@quadone.com")) {
        setIsAuth(true);
        navigate("/");
      } else {
        await signOut(auth);
        setIsAuth(false);
        alert("Unautheriged user, access denied");
        navigate("/signin");
      }
    }
  };
  return (
    <div className=" flex  justify-center items-center h-screen">
      <div
        className="border cursor-pointer flex items-center w-fit p-3 gap-2 rounded-[2px] bg-gradient-to-r from-blue-950 to-blue-800 text-white font-medium text-[18px]"
        onClick={handleGoogleLogin}
      >
        <img src={"/google_logo.png"} width={20} /> Sign in with google
      </div>
    </div>
  );
};

export default SignIn;
