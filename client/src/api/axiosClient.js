import axios from "axios";
// import queryString from "query-string"; //To retrieve URL queries

const BASE_URL = "http://localhost:3001/api/v1";
const getToken = () => localStorage.getItem("token");

//Instantiate axios ((for common preprocessing = convert everything to JSON))
const axiosClient = axios.create({
  baseURL: BASE_URL,
  //convert parameter to JSON
//   paramsSerializer: (params) => queryString.stringify({ params }),
});

//Perform preprocessing before hitting the API
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, //Pass a token in the request header to the server
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;