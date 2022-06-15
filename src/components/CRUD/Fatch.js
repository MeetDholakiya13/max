/* eslint-disable react-hooks/exhaustive-deps */
import { getAllTodo, listenAllNotification } from "../../firebase";
import useAllNotifications from "../../hooks/constants";
import React, { useState, useEffect } from "react";
// import { async } from "@firebase/util";

// Define how each display entry will be structured

function Fatch() {
  const comments = useAllNotifications();
  // const [title, setTitle] = useState();
  const [info, setInfo] = useState([]);
  console.log("comments", comments);
  var data = "";
  // Start the fetch operation as soon as
  // the page loads
  // const f = () => {
  //   getAllTodo();
  //   data = listenAllNotification();
  //   console.log("RES", data);
  //   setInfo(data);
  //   console.log("comments", comments);
  //   // console.log("element", data);

  //   console.log("element.todo", info);
  // };
  useEffect(() => {
    // f();
  }, []);

  // Fetch the required data using the get() method
  return (
    <>
      <h1>{data}</h1>
      {comments?.map(({ title, todo, id }, index) => (
        <p key={index}>
          {title}={todo},{id}
        </p>
      ))}
    </>
  );
}

export default Fatch;
