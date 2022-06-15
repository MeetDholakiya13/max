import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useAuthListener } from "./hooks";
import React from "react";
import "./App.css";
import Movie from "./components/Moviedb/Index";
import Details from "./components/Moviedb/Details";
import Login from "./components/Login/index";
import Register from "./components/Registration/index";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ForgotPassword from "./components/ForgotPassword";
import Add from "./components/CRUD/add";
import Data from "./components/CRUD/data";
import Update from "./components/CRUD/Update";
// import FatchData from "./components/CRUD/Fatch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuthListener } from "./hooks/index";
// import { getAuth } from "firebase/auth";
import { logout } from "./firebase";
import { useAuthListener } from "./hooks/index";
import Fatch from "./components/CRUD/Fatch";
// import { , ProtectedRoute } from './Helpers/routes';

// import ProtectedRoute from "./components/ProtectedRoute";

const PrivateRoute1 = ({ user, ...props }) => {
  // const token = localStorage.getItem("Token");

  console.log("user", user);

  if (!user) {
    return props.children;
  } else {
    return <Navigate to="/movie" />;
  }
};

function App() {
  const { user } = useAuthListener();

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      // if (user?.currentUser?.emailVerified) {
      //   return props.children;
      // } else {
      //   toast.warn("Veryfi your Email");
      //   logout();
      //   localStorage.removeItem("Token");
      //   localStorage.removeItem("user");
      //   return <Navigate to="/" />;
      // }
      return props.children;
    } else {
      // toast.warn("login first");
      return <Navigate to="/" />;
    }
    // return props.children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            {/* auth */}
            <Route
              path="/"
              element={
                <PrivateRoute1 user={user}>
                  <Login />
                </PrivateRoute1>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <PrivateRoute1 user={user}>
                  <ForgotPassword />
                </PrivateRoute1>
              }
            />

            <Route
              path="/register"
              element={
                <PrivateRoute1 user={user}>
                  <Register />
                </PrivateRoute1>
              }
            />
            <Route
              path="/details"
              element={
                <PrivateRoute user={user}>
                  <Details />
                </PrivateRoute>
              }
            />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<Fatch />} />
            <Route path="/update" element={<Update />} />
            <Route path="/data" element={<Data />} />
            <Route
              path="/movie"
              element={
                <PrivateRoute user={user}>
                  <Movie />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
