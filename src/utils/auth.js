const BASE_URL = "http://localhost:3001";

const register = ({ name, avatar, email, password }) => {
  console.log("auth.register called with:", { name, avatar, email, password });
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject("Registration failed")
  );
};

const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject("Login failed")));
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject("Invalid token")));
};

export default {
  register,
  login,
  checkToken,
};
