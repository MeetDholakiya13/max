/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AddData, AddData1 } from "../../firebase";
function add() {
  const [FormData, setLoaginFormData] = useState({
    title: "",
    todo: "",
  });

  const handleOnChange = (key, value) => {
    setLoaginFormData({ ...FormData, [key]: value });
    // console.log("formdata", FormData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    AddData(FormData.title, FormData.todo);
  };

  return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="email">
          {console.log("Hello login")}
          <h1>Add data</h1>
          <Form.Label>title</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            // value={email}
            onChange={({ target }) => handleOnChange("title", target.value)}
          />
          {/* {err?.field === "email" && <h3>{err?.value}</h3>} */}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            // value={password}
            onChange={({ target }) => handleOnChange("todo", target?.value)}
          />
          {/* <h3> {errpassword}</h3> */}
          {/* {err?.field === "password" && <h3>{err?.value}</h3>} */}
        </Form.Group>
        {/* <h1>{err}</h1> */}

        <Button
          block="true"
          size="lg"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}

export default add;
