import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import { Apicall1 } from "../Api/index";
// import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";

function Details() {
  const { id } = useUserAuth();
  const navigate = useNavigate();

  const api = "api_key=b45cce70bce060e172f3dd4d7f839c55";
  const url = `https://image.tmdb.org/t/p/w500/`;

  const [image, setImage] = useState();
  const [internaldata, setInternalData] = useState({});
  const handleSub = (e) => {
    navigate("/movie");
  };
  async function d() {
    const res = await Apicall1(id, api);
    console.log("Iid", id);
    console.log(
      "res-----------------------------------------------------------------------------------",
      res
    );
    setImage(res.data.backdrop_path);
    console.log("image", image);
    setInternalData(res.data);
    console.log("internalData", internaldata.original_title);
  }
  useEffect(() => {
    d();
  }, []);
  const mystyle = {
    backgroundSize: "cover",
    height: "100vh",
    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${image})`,
  };
  return (
    <>
      <h1 className="model-title">{internaldata.title}</h1>
      <img
        src={`${url}${internaldata.poster_path}`}
        className="image"
        alt="img"
      />
      <p className="movie_text">{internaldata.overview}</p>
      <p>Ratting : {internaldata.vote_average}</p>
      <p>Ratting Count : {internaldata.vote_count}</p>
      <button type="button" onClick={handleSub} className="btn btn-primary">
        Go Back
      </button>
    </>
  );
}

export default Details;
