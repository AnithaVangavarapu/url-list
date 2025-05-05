import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useContext, useEffect } from "react";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignIn = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { setIsAuth, isAuth } = contextData;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
    else navigate("/signin");
  }, [isAuth]);

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
        localStorage.setItem("isUserLoggedIn", "true");
        setIsAuth(true);
        navigate("/");
      } else {
        await signOut(auth);
        localStorage.setItem("isUserLoggedIn", "false");
        setIsAuth(false);
        toast.error("Unautheriged user, access denied!", {
          style: {
            fontSize: "12px",
          },
        });
        navigate("/signin");
      }
    }
  };
  return (
    <div className=" flex  justify-center items-center h-screen gap-10">
      <img src={"/login.svg"} width={"50%"} />
      <div
        className="border cursor-pointer flex items-center p-3 gap-2 rounded-md bg-blue-950 text-white font-medium text-[18px]"
        onClick={handleGoogleLogin}
      >
        <img src={"/google_logo.png"} width={20} /> Sign in with google
      </div>
    </div>
  );
};

export default SignIn;
