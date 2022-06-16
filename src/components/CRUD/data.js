/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

function Data() {
  const [newTitle, setNewTitle] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [newTodoSet, setNewTodoSet] = useState("false");

  const ab = localStorage.getItem("user");
  const [todo, setTodo] = useState([]);
  const ab1 = [ab][0].split(`"email":`)[1].split(`"emailVerified"`)[0].trim();
  const ab2 = ab1.split(",")[0].trim();
  const usersCollectionRef = collection(db, "todo");
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      title: newTitle,
      todo: newTodo,
      email: ab2,
    });
    setNewTodoSet("true");
  };

  const updateTodo = async (id) => {
    console.log("id", id);
    const userDoc = doc(db, "todo", id);

    console.log("userDoc", userDoc);
    // await updateDoc(userDoc, newFields);
    await updateDoc(doc(db, "todo", id), {
      title: newTitle,
      todo: newTodo,
    })
      .then(() => console.log("success"))
      .catch((error) => console.log("error", error));
    setNewTodoSet("true");
  };

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "todo", id);
    await deleteDoc(userDoc);
    setNewTodoSet("true");
  };

  const getUsers = async () => {
    // const data = await getDocs(usersCollectionRef, where("email", "==", ab2));
    // //   console.log("data555555555555", data);
    // setTodo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const arr = [];
    const citiesRef = collection(db, "todo");

    const q = query(citiesRef, where("email", "==", ab2));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("2", doc.id);
      // doc.data() is never undefined for query doc snapshots
      arr.push({ id: doc.id, data: doc.data() });
      // console.log(doc.id, " => ", doc.data());
    });
    setTodo(arr);
    setNewTodoSet("false");
  };

  useEffect(() => {
    getUsers();
    // console.log("todo", todo);
  }, []);
  useEffect(() => {
    getUsers();
    // console.log("todo", todo);
  }, [newTodoSet]);
  return (
    <div className="App">
      <input
        placeholder="title..."
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="todo"
        onChange={(event) => {
          setNewTodo(event.target.value);
        }}
      />

      <button onClick={createUser}> Create todo</button>
      <br />
      {console.log("todo", todo)}
      {todo &&
        todo.map((val) => {
          return (
            <>
              <>
                title:{" "}
                <input
                  type="text"
                  placeholder="todo"
                  defaultValue={val.data.title}
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                />{" "}
              </>{" "}
              todo:
              <input
                type="text"
                placeholder="todo"
                defaultValue={val.data.todo}
                onChange={(event) => {
                  setNewTodo(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateTodo(val.id);
                }}
              >
                {" "}
                Update todo
              </button>
              <button
                onClick={() => {
                  deleteTodo(val.id);
                }}
              >
                {" "}
                Delete todo
              </button>
              <br />
            </>
          );
        })}
    </div>
  );
}

export default Data;
