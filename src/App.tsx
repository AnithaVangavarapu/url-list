import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { UserProvider } from "./context/UserProvider";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AddURL } from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="font-poppins">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<AddURL />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </UserProvider>
    </div>
  );
}

export default App;
