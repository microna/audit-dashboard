import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // timeout: 10000,
  // params: {}
});

instance.interceptors.request.use((req) => {
  req.headers.authorization = window.localStorage.getItem("token");
  return req;
});

export default instance;
