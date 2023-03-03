import { useState, useEffect } from "react";

import {
  getAllPersons,
  addPerson,
  deletePersonById,
  updatePerson,
} from "./api/Api.js";

import { ErrorMessage, DispatchMessage } from "./lib/Message.js";

const Message = ({ message }) => {
  if (message === null) return <></>;

  return (
    <>
      <p className={message.class}>{message.getDescription()}</p>
    </>
  );
};

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

const Numbers = ({ persons, searchPattern, deleteEntry }) => {
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
                <li key={name.id}>
                  {`${name.name} ${name.number}`}{" "}
                  <button onClick={() => deleteEntry(name.id)}>delete</button>
                </li>
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

  const [message, setMessage] = useState(null);

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      persons
        .map((number) => number.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      if (
        !window.confirm(
          `${newName} is already to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }

      const oldPerson = persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )[0];

      const newPerson = {
        id: oldPerson.id,
        name: oldPerson.name,
        number: newNumber,
      };

      updatePerson(newPerson)
        .then((updatedPerson) =>
          setPersons(
            persons
              .filter((person) => person.id !== updatedPerson.id)
              .concat(updatedPerson)
          )
        )
        .catch(() => setMessage(new ErrorMessage(newPerson.name)));

      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    addPerson(newPerson).then((addedPerson) =>
      setPersons(persons.concat(addedPerson))
    );

    setMessage(new DispatchMessage(newPerson.name));
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    setNewName("");
    setNewNumber("");
  };

  const deleteEntry = (id) => {
    const delitingPerson = persons.filter((person) => person.id === id)[0];
    if (!window.confirm(`Delete ${delitingPerson.name} ?`)) return null;
    deletePersonById(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Message message={message} />
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
      <Numbers
        persons={persons}
        searchPattern={searchPattern}
        deleteEntry={deleteEntry}
      />
    </>
  );
};

export default App;
