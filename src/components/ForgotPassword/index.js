import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState();

  const hanldeValidation = (data) => {
    if (data) {
      const patternForEmail =
        /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

      console.log("data::", data);
      if (!data) {
        // setErr({ field: "email", value: "Please fill email" });
        return false;
      } else if (data) {
        if (!patternForEmail?.test(data)) {
          //   setErr({ field: "email", value: "Invalid email" });
          return false;
        }
      }
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    await sendPasswordResetEmail(auth, email);
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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handelSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
