import axios from "axios";
export const Apicall = (page, api) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/popular?page=${page}&${api}`
  );
};

export const Apicall1 = (id, api) => {
  // console.log("id", id);
  // console.log("api", api);

  return axios.get(`https://api.themoviedb.org/3/movie/${id}?${api}`);
};
