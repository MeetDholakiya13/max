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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Data from "./components/CRUD/data";

// import FatchData from "./components/CRUD/Fatch";

import "react-toastify/dist/ReactToastify.css";
// import { useAuthListener } from "./hooks/index";
// import { getAuth } from "firebase/auth";

import { useAuthListener } from "./hooks/index";

// import { , ProtectedRoute } from './Helpers/routes';

// import ProtectedRoute from "./components/ProtectedRoute";

const PrivateRoute1 = ({ user, ...props }) => {
  // const token = localStorage.getItem("Token");

  console.log("userpublocroute", user);

  if (!user) {
    return props.children;
  } else {
    return <Navigate to="/movie" />;
  }
};

const PrivateRoute = ({ user, ...props }) => {
  console.log("userprivateroute", user);

  if (user) {
    if (user?.emailVerified) {
      return props.children;
    } else {
      toast("verify your account ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

function App() {
  const { user } = useAuthListener();

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

            <Route
              path="/data"
              element={
                <PrivateRoute user={user}>
                  <Data />
                </PrivateRoute>
              }
            />
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
