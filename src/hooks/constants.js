import { useState, useEffect } from "react";
import { listenAllNotification } from "../firebase";

function useAllNotifications() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const listener = listenAllNotification((comment) => {
      setComments(comment);
    });
    console.log("listener", listener);
    return () => listener && listener();
  }, []);

  return comments;
}
export default useAllNotifications;
