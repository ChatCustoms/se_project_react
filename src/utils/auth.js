const BASE_URL = "http://localhost:3001";
import { checkResponse } from "./api";

const register = ({ name, avatar, email, password }) => {
  console.log("auth.register called with:", { name, avatar, email, password });
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    checkResponse(res);
  });
};

const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    checkResponse(res);
  });
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    checkResponse(res);
  });
};

export default {
  register,
  login,
  checkToken,
};
