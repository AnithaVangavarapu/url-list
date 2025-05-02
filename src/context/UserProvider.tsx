import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

interface UserProviderProps {
  children: React.ReactNode;
}
export interface UserContextProps {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
}
export const UserContext = createContext<UserContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  loading: false,
  setLoading: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const value = { isAuth, setIsAuth, loading, setLoading };

  useEffect(() => {
    localStorage.setItem("isUserLoggedIn", String(isAuth));
  }, [isAuth]);

  useEffect(() => {
    setLoading(true);

    auth.onAuthStateChanged(async (user) => {
      if (user?.email?.endsWith("@quadone.com")) {
        localStorage.setItem("isUserLoggedIn", "true");
        setIsAuth(true);
      } else {
        localStorage.setItem("isUserLoggedIn", "false");
        setIsAuth(false);
      }
      setLoading(false);
    });

    setLoading(false);
  }, []);

  return <UserContext value={value}>{children}</UserContext>;
};
