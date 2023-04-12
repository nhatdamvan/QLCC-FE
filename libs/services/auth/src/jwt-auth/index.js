import axios from "@crema/services/axios";

const jwtAxios = axios.create({
  baseURL: process.env.NX_API_URL, //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === "Token is not valid") {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (accessToken) => {
  if (accessToken) {
    jwtAxios.defaults.headers.common["token"] = accessToken; // Change this according your requirement
    localStorage.setItem("token", accessToken);
  } else {
    delete jwtAxios.defaults.headers.common["token"];
    localStorage.removeItem("token");
  }
};

export default jwtAxios;
