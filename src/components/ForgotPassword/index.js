import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  const [err, setErr] = useState();

  const hanldeValidation = (data) => {
    console.log("data", data);

    if (data) {
      const patternForEmail =
        /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

      const isValidEmail = patternForEmail.test(data);

      if (!isValidEmail) {
        setErr("Invalid email");
      }

      return isValidEmail;
    }

    setErr("Please fill email");
    return false;
    // if (!data) {
    //   setErr("Please fill email");
    //   return false;
    // } else {
    //   const patternForEmail =
    //     /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

    //   console.log("data::", data);
    //   if (!patternForEmail.test(data)) {
    //     setErr("Invalid email");
    //     return false;
    //   }
    //   return true;
    // }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const a = hanldeValidation(email);
    console.log("hello1111", a);
    if (a) {
      await sendPasswordResetEmail(auth, email);
      console.log("hello");
      toast("Link was send", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setTimeout(() => {
      navigate("/");
      // console.log('Hello, World!')
    }, 3000);
  };
  const handelSubmit1 = async (e) => {
    navigate("/");
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        {err}
        <br />

        <Button variant="primary" type="submit" onClick={handelSubmit}>
          Submit
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <Button variant="primary" onClick={handelSubmit1}>
          back to login
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ForgotPassword;
