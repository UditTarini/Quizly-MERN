import {base_route} from "../../backend";

export const signout = (next) => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${base_route}/signout`, {
      method: "GET",
    })
      .then((res) => {})
      .catch((err) => console.log(err));
  }
};

export const register = (user) => {
  return fetch(
    // url
    `${base_route}/register`,
    {
      // data for url
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log("ERR", err));
};

export const login = (user) => {
  return fetch(
    // url
    `${base_route}/login`,
    {
      // data for url
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
