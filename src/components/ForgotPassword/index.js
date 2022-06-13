import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState();
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
      </Form>
    </div>
  );
}

export default ForgotPassword;
