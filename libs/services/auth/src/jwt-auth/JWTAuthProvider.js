import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios, { setAuthToken } from "./index";

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({
  children,
  fetchStart,
  fetchSuccess,
  fetchError,
}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const getAuthUser = () => {
      fetchStart();
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("userInfo");

      if (!token) {
        fetchSuccess();
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      } else {
        fetchSuccess();
        setJWTAuthData({
          user: JSON.parse(userInfo),
          isLoading: false,
          isAuthenticated: true,
        });
        setAuthToken(token);
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ email, password }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post("login", {
        Username: email,
        Password: password,
      });
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(data?.userInfo));
        setAuthToken(data.accessToken);
        // const res = await jwtAxios.get('/auth');
        setJWTAuthData({
          user: data.userInfo,
          isAuthenticated: true,
          isLoading: false,
        });
        fetchSuccess();
      } else {
        setJWTAuthData({
          ...firebaseData,
          isAuthenticated: false,
          isLoading: false,
        });
        fetchError(data.message || "Something went wrong");
      }
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error?.response?.data?.error || "Something went wrong");
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post("users", { name, email, password });
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log("error:", error.response.data.error);
      fetchError(error?.response?.data?.error || "Something went wrong");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
