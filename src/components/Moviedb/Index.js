import React, { useEffect, useState } from "react";
import axios from "axios";
import { Apicall } from "../Api/index";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { logout, auth } from "../../firebase";
import Header from "../Navbar/Header";
import { signOut } from "firebase/auth";
import { Card, Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";

import Details from "./Details";

export const Movie = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [internaldata, setInternalData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [image, setImage] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const ab = localStorage.getItem("user");
  const { apiCall, setData1 } = useUserAuth();
  // let email = "";

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      //aya  email na aave  token aave
      // setCookie("name", user, { path: "/dashboard" });
      navigate("/");
    } else {
      console.log(
        "first ab",
        [ab][0].split(`"email":`)[1].split(`"emailVerified"`)[0].trim()
      );
      const ab1 = [ab][0]
        .split(`"email":`)[1]
        .split(`"emailVerified"`)[0]
        .trim();
      const ab2 = ab1.split(",")[0].trim();

      setemail(ab2.split('"')[1].trim());
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    signOut(auth);
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const more = () => {
    setPage(page + 1);
  };
  const handleSub = (event) => {
    setIsShow(false);
  };
  // Set url in set image
  const url = `https://image.tmdb.org/t/p/w500/`;
  const api = "api_key=b45cce70bce060e172f3dd4d7f839c55";
  // Api call
  async function getPage(page) {
    const res = await apiCall(page, api);
    console.log("data", data);
    console.log("res.data.results", res.data.results);
    setData([...data, ...res.data.results]);
  }
  const showData = async (event) => {
    console.log("event===>", event);
    const { id } = event.target;
    setData1(id);
    navigate("/details");
    let internaldata = data.filter((value) => value.id == id);
    setIsShow(true);

    console.log(internaldata);
    // setInternalData(internaldata[0]);
  };
  useEffect(() => {
    getPage(page);
  }, [page]);

  return (
    <>
      <h1>Welcome {email}</h1>
      {/* //aavi rite na chale aa upar define karavanu hoy */}
      {data.map((item, index) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`${url}${item.poster_path}`} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.overview} </Card.Text>
              <Button variant="primary" id={item.id} onClick={showData}>
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      <button type="button" onClick={more} className="btn btn-primary">
        Load More...
      </button>
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        signOut
      </button>
    </>
  );
};
export default Movie;
