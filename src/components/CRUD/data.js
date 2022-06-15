import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Data() {
  const [newTitle, setNewTitle] = useState("");
  const [newTodo, setNewTodo] = useState(0);

  const [todo, setTodo] = useState([]);
  const usersCollectionRef = collection(db, "todo");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { title: newTitle, todo: newTodo });
  };

  const updateTodo = async (id) => {
    console.log("id", id);
    const userDoc = doc(db, "todo", id);
    const newFields = newTodo;
    console.log("userDoc", userDoc);
    // await updateDoc(userDoc, newFields);
    await updateDoc(doc(db, "todo", id), {
      title: newTitle,
      todo: newTodo,
    })
      .then(() => console.log("success"))
      .catch((error) => console.log("error", error));
  };

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "todo", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //   console.log("data555555555555", data);
      setTodo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

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
      {todo.map((user) => {
        return (
          <div>
            {" "}
            title:{" "}
            <input
              type="text"
              defaultValue={user.title}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
            todo:{" "}
            <input
              type="text"
              defaultValue={user.todo}
              onChange={(event) => {
                setNewTodo(event.target.value);
              }}
            />
            <button
              onClick={() => {
                updateTodo(user.id);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                deleteTodo(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Data;
