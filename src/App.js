import { useState, useEffect } from "react";

import { getAllPersons, addPerson } from "./api/Api.js";

const Form = ({
  handleSubmit,
  setNewName,
  newName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      name:
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <br />
      number:
      <input
        value={newNumber}
        onChange={(event) => setNewNumber(event.target.value)}
      />
      <br />
      <button type="sumbit">add</button>
    </form>
  );
};

const Numbers = ({ persons, searchPattern }) => {
  console.log(persons);
  return (
    <>
      <h1>Numbers</h1>
      <ul>
        {persons != null
          ? persons
              .filter((name) =>
                name.name.toLowerCase().includes(searchPattern.toLowerCase())
              )
              .map((name) => (
                <li key={name.name}>{`${name.name} ${name.number}`}</li>
              ))
          : ""}
      </ul>
    </>
  );
};

const Search = ({ searchPattern, setSearchPattern }) => {
  return (
    <>
      filter shown with
      <input
        value={searchPattern}
        onChange={(event) => setSearchPattern(event.target.value)}
      />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPattern, setSearchPattern] = useState("");

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.map((number) => number.name).includes(newName)) {
      alert(`${newName} already exist`);
      setNewName("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    addPerson(newPerson).then((addedPerson) =>
      setPersons(persons.concat(addedPerson))
    );

    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Search
        searchPattern={searchPattern}
        setSearchPattern={setSearchPattern}
      />
      <h1>add a new</h1>
      <Form
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <Numbers persons={persons} searchPattern={searchPattern} />
    </>
  );
};

export default App;
