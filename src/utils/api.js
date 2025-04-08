const baseUrl = "http://localhost:3002";

function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
}

export { getItems };
