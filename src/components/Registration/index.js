import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../Navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import { errorHandler } from "../../utils/databaseErrorHandler";
import { sendEmailVerification, getAuth } from "firebase/auth";

export default function Login() {
  // if(email.length)

  const auth = getAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errpassword, setPasswordError] = useState();
  const [err, setErr] = useState({ field: "", value: "" });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { signUp, user } = useUserAuth();

  const handleOnChange = (key, value) => {
    setRegisterData({ ...registerData, [key]: value });
  };

  const hanldeValidation = (data) => {
    if (data) {
      const patternForEmail =
        /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

      console.log("data::", data);
      if (!data?.email) {
        setErr({ field: "email", value: "Please fill email" });
        return false;
      } else if (data?.email) {
        if (!patternForEmail?.test(data?.email)) {
          setErr({ field: "email", value: "Invalid email" });
          return false;
        }
      }
      if (!data?.password) {
        setErr({ field: "password", value: "please Enter password" });
        return false;
      } else if (data?.password?.length < 6) {
        setErr({ field: "password", value: "max 6 letters" });
        return false;
      } else {
        setErr({ field: "", value: "" });
        return true;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidForm = hanldeValidation(registerData);
    console.log("isValidForm::", isValidForm);

    if (isValidForm) {
      // console.log(password, "passwoerddaaaaaaaaaaaaaaa", errpassword);
      if (!errpassword) {
        try {
          const res = await signUp(registerData?.email, registerData?.password);
          // console.log("a==>", a.email);
          console.log("res", res);

          await sendEmailVerification(auth.currentUser);

          // localStorage.setItem("Token", a.user.accessToken);
          // localStorage.setItem("user", JSON.stringify(a));
          navigate("/");
        } catch (err) {
          console.log(
            "error=========================>",
            errorHandler(err?.code)
          );
          setError(errorHandler(err?.code));
          // switch (err.code) {
          //   case "auth/wrong-password":
          //     setErr("Invalid email or password");
          //     console.log("first");
          //     break;
          //   case "auth/user-not-found":
          //     setErr("user-not-found");
          //     console.log("first");
          //     break;
          //   case "auth/claims-too-large":
          //     setErr("claims-too-large");
          //     console.log("first");
          //     break;
          //   case "auth/email-already-exists":
          //     setErr("email-already-exists");
          //     console.log("first");
          //     break;
          //   case "auth/id-token-expired":
          //     setErr("id-token-expired");
          //     console.log("first");
          //     break;
          //   case "auth/id-token-revoked":
          //     setErr("id-token-revoked");
          //     console.log("first");
          //     break;
          //   case "auth/insufficient-permission":
          //     setErr("insufficient-permission");
          //     console.log("first");
          //     break;
          //   case "auth/internal-error":
          //     setErr("internal-error");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-argument":
          //     setErr("invalid-argument");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-claims	":
          //     setErr("invalid-claims	");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-continue-uri":
          //     setErr("invalid-continue-uri");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-creation-time":
          //     setErr("invalid-creation-time");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-credential":
          //     setErr("invalid-credential");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-disabled-field":
          //     setErr("invalid-disabled-field");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-display-name":
          //     setErr("invalid-display-name");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-dynamic-link-domain":
          //     setErr("invalid-dynamic-link-domain");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-email":
          //     setErr("invalid-email");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-email-verified":
          //     setErr("invalid-email-verified");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-algorithm":
          //     setErr("invalid-hash-algorithm");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-block-size":
          //     setErr("invalid-hash-block-size");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-derived-key-length":
          //     setErr("invalid-hash-derived-key-length");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-keyd":
          //     setErr("invalid-hash-key");
          //     console.log("first");
          //     break;
          //   case "auth/too-many-requestst":
          //     setErr("too-many-requestst");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-parallelization":
          //     setErr("invalid-hash-parallelization");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-rounds":
          //     setErr("invalid-hash-rounds");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-hash-salt-separator":
          //     setErr("invalid-hash-salt-separator");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-id-token":
          //     setErr("invalid-id-token");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-last-sign-in-time":
          //     setErr("invalid-last-sign-in-time");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-page-token":
          //     setErr("invalid-page-token");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-password":
          //     setErr("invalid-password");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-password-hash":
          //     setErr("invalid-password-hash");
          //     console.log("first");
          //     break;
          //   case "auth/invalid-password-salt":
          //     setErr("auth/invalid-password-salt");
          //     console.log("first");
          //     break;
          //   default:
          //     setErr("something wrong");

          //     break;
          // }
        }
      } else {
        setPasswordError("Incorrect Password ");
        setPassword("");
        console.log(password, "passwoerdddddddddd");
      }
    } else {
      console.log("incorrect username and password");
      return false;
    }
  };

  return (
    <div className="Register">
      <Header />
      <Form>
        <Form.Group size="lg" controlId="email">
          <h1>Register.....</h1>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            // value={email}
            onChange={({ target }) => handleOnChange("email", target.value)}
          />
          {err?.field === "email" && <h3>{err?.value}</h3>}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            // value={password}
            onChange={({ target }) => handleOnChange("password", target?.value)}
          />
          {/* <h3> {errpassword}</h3> */}
          {err?.field === "password" && <h3>{err?.value}</h3>}
        </Form.Group>
        {/* <h1>{err}</h1> */}
        {error && error?.message ? (
          <p className="text-danger">{error?.message}</p>
        ) : (
          ""
        )}
        <Button
          block="true"
          size="lg"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Registration
        </Button>
      </Form>
    </div>
  );
}
