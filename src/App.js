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

// import { useAuthListener } from "./hooks/index";
import { getAuth } from "firebase/auth";
import { auth, logout } from "./firebase";
// import { , ProtectedRoute } from './Helpers/routes';

// import ProtectedRoute from "./components/ProtectedRoute";

const PrivateRoute1 = (props) => {
  // alert(auth);
  const token = localStorage.getItem("Token");

  if (!auth?.currentUser) {
    return props.children;
  } else {
    alert("you are alredy login");
    return <Navigate to="/movie" />;
  }
};

function App() {
  // const { user } = useAuthListener();
  const auth = getAuth();

  // const navigate = useNavigate();

  const PrivateRoute = (props) => {
    // alert(auth);
    const token = localStorage.getItem("Token");
    // console.log("auth====>", auth);
    if (auth?.currentUser?.emailVerified) {
      return props.children;
    } else {
      alert("Veryfi your Email");
      logout();
      localStorage.removeItem("Token");
      localStorage.removeItem("user");
      return <Navigate to="/" />;
    }
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
                <PrivateRoute1>
                  <Login />
                </PrivateRoute1>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <PrivateRoute1>
                  <ForgotPassword />
                </PrivateRoute1>
              }
            />

            <Route
              path="/register"
              element={
                <PrivateRoute1>
                  <Register />
                </PrivateRoute1>
              }
            />
            <Route
              path="/details"
              element={
                <PrivateRoute>
                  <Details />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie"
              element={
                <PrivateRoute>
                  <Movie />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
