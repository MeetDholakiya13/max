/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";

import { getAuth, onAuthStateChanged } from "firebase/auth";
// import React from "react";

function useAuthListener() {
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const listener = onAuthStateChanged(auth, (authUser) => {
      console.log("authUser", authUser);
      if (authUser && authUser?.emailVerified) {
        localStorage.setItem("Token", authUser.accessToken);
        localStorage.setItem("user", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("Token");
        localStorage.removeItem("user");
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => listener && listener();
  }, []);
  return { user, isLoading };
}
export default useAuthListener;
