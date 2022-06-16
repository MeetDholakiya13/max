// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk3lFxm4qvyEiPIa0ZUrefq2VT6kXTA5U",
  authDomain: "auth-de840.firebaseapp.com",
  projectId: "auth-de840",
  storageBucket: "auth-de840.appspot.com",
  messagingSenderId: "950982971221",
  appId: "1:950982971221:web:0befde0ccbfe6e98bee9dc",
  measurementId: "G-7RM84KEPVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        title: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  // console.log(email, password);
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
const AddData = async (title, todo) => {
  try {
    await addDoc(collection(db, "todo"), {
      title: title,
      // authProvider: "google",
      todo: todo,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const listenAllNotification = (callback) => {
  const listenEssayQuery = query(collection(db, "todo"));
  const essays = [];
  return onSnapshot(listenEssayQuery, (querySnapshot) => {
    querySnapshot.forEach((doc) => essays.push(doc.data()));
    callback(essays);
  });
  // return essays;
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  AddData,
  listenAllNotification,
};
