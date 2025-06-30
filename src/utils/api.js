const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

function addItem(item, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Error: ${response.status}`);
  }
  return response.json();
}

const updateProfile = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject("Profile update failed")
  );
};

export { getItems, deleteItem, addItem, checkResponse, updateProfile };
