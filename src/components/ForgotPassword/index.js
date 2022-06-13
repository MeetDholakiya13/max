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
    if (!data) {
      setErr("Please fill email");
      return false;
    } else if (data) {
      const patternForEmail =
        /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

      if (data) {
        console.log("data::", data);
        if (!patternForEmail?.test(data)) {
          setErr("Invalid email");
          return false;
        }
      }
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const a = hanldeValidation(email);
    if (a) await sendPasswordResetEmail(auth, email);
    toast("Link was send", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    </div>
  );
  <Toast show={showA} onClose={toggleShowA}>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      <strong className="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
  </Toast>;
}

export default ForgotPassword;
