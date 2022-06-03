import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import React from "react";

function useAuthListener() {
  const auth = getAuth();
  const [user, setUser] = useState(auth);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser && authUser?.emailVerified) {
        fetchData(authUser?.email, authUser);
      } else {
        localStorage.removeItem("Token");
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    const fetchData = async (email, authUser) => {
      localStorage.setItem("Token", authUser.user.accessToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);
    };
    return () => listener();
  }, []);
  return { user };
}
export default useAuthListener;
