import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { useAuthListener } from "./hooks";
import React from "react";
import "./App.css";
import Movie from "./components/Moviedb/Index";
import Details from "./components/Moviedb/Details";
import Login from "./components/Login/index";
import Register from "./components/Registration/index";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import { useAuthListener } from "./hooks/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import { , ProtectedRoute } from './Helpers/routes';

// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const { user } = useAuthListener();
  const auth = getAuth();
  // const navigate = useNavigate();

  const PrivateRoute = (props) => {
    // alert(auth);
    const token = localStorage.getItem("Token");
    console.log("auth====>", auth);
    if (auth?.currentUser?.emailVerified) {
      return props.children;
    } else {
      return "Veryfi your Email";
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            {/* auth */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Details />} />
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
