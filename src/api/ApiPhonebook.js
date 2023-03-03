import { Error404 } from "../lib/Errors.js";

const apiURL = "http://localhost:3001/persons";

function getAllPersons() {
  return fetch(apiURL).then((response) => {
    return response.json();
  });
}

function addPerson(newPerson) {
  return fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(newPerson),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
}

function deletePersonById(personId) {
  return fetch(`${apiURL}/${personId}`, { method: "DELETE" });
}

function updatePerson(newPerson) {
  return fetch(`${apiURL}/${newPerson.id}`, {
    method: "PUT",
    body: JSON.stringify(newPerson),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status === 404) throw new Error404();
    return response.json();
  });
}

export { getAllPersons, addPerson, deletePersonById, updatePerson };
