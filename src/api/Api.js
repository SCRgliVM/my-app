const apiURL = "http://localhost:3001/persons";

function getAllPersons() {
  return fetch(apiURL).then((response) => {
    return response.json();
  });
}

function addPerson(newPerson) {
  return fetch(apiURL, {
    method: "post",
    body: JSON.stringify(newPerson),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
}

export { getAllPersons, addPerson };