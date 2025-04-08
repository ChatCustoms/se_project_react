const baseUrl = "http://localhost:3002";

function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
  });
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
}

export { getItems, deleteItem, addItem };
