import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //   signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
// import Login from "../components/login/Index";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [id, setId] = useState();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function setData1(data) {
    setId(data);
  }
  function apiCall(page, api) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&${api}`
    );
  }

  // function Apicall1(id, api) {
  //   return axios.get("https://api.themoviedb.org/3/movie/"id"?${api}`);
  // }

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, login, apiCall, setData1, id }}
    >
      {console.log("atttttt", children)}
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
