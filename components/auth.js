import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";

export const registerUser = (username, email, password) => {
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local/register`, { username, email, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local/`, { identifier, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        console.log(res.data.user)
        console.log(res.data.jwt);
      })
      .catch((error) => {
        reject(error);
        console.log("No Match")
      });
  });
};

export const logout = () => {
  Cookie.remove("token");
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
