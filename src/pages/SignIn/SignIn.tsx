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
    <div className="container mx-auto  place-content-center h-screen ">
      <div className=" grid grid-cols-2 gap-10 mx-5">
        <img src={"/login.svg"} className="ml-10" />
        <div className=" m-auto  border  p-10  border-gray-200 rounded-md shadow-sm bg-gray-50 w-fit  h-fit">
          <div className="flex flex-col  items-center">
            <div className="text-[24px] font-medium text-blue-950">
              Welcome !
            </div>
            <p className="text-[10px] mb-5 font-light">
              Authenticate your details with google!
            </p>
            <div
              className="border cursor-pointer flex justify-center items-center py-2 px-2.5 gap-2 rounded-[20px] bg-blue-950 text-white font-medium text-[14px]"
              onClick={handleGoogleLogin}
            >
              <img src={"/google_logo.png"} width={15} /> Sign in with google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
