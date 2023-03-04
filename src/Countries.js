import { useEffect, useState } from "react";

import { getAll } from "./api/ApiCountries.js";

class Countries {
  constructor(countries) {
    if (countries instanceof Countries) {
      this._countries = countries.copy();
      return this;
    }
    let id = 0;
    this._countries = countries.map((country) => {
      return {
        id: id++,
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "Unknown",
        area: country.area,
        languages: Array.from(
          Object.values(country.languages ? country.languages : {})
        ),
        flag: country.flags.svg,
      };
    });
    return this;
  }
  getNames() {
    return this._countries.map((country) => {
      return {
        name: country.name,
        id: country.id,
      };
    });
  }
  copy() {
    return this._countries.map((country) => country);
  }
  getLength() {
    return this._countries.length;
  }
  filter(query) {
    return this._countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

const Search = ({ query, setQuery }) => {
  return (
    <>
      <label htmlFor="searchField">Find country:</label>
      <input
        id="searchField"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

const CountryInformation = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt="flag"
        style={{ border: "1px solid black", maxWidth: 200, maxHeight: 200 }}
      />
    </>
  );
};

const TooManyMatches = () => {
  return <p>too many matches, specify another filter</p>;
};

const CountriesList = ({ countries, setChoosenCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.id}>
          {country.name}{" "}
          <button onClick={() => setChoosenCountry(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

const FoundInformation = ({ foundCountries }) => {
  const [choosenCountry, setChoosenCountry] = useState(null);

  if (foundCountries === null) return <p>Loading...</p>;

  if (choosenCountry !== null)
    return <CountryInformation country={choosenCountry} />;

  if (foundCountries.length > 10) return <TooManyMatches />;
  if (foundCountries.length > 1)
    return (
      <CountriesList
        setChoosenCountry={setChoosenCountry}
        countries={foundCountries}
      />
    );
  if (foundCountries.length === 1)
    return <CountryInformation country={foundCountries[0]} />;
  if (foundCountries.length === 0) return <p>Nothing found</p>;

  throw Error("Dead point in FoundInformation component");
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [query, setQuery] = useState("");

  let matches = [];
  if (countries !== null && query !== "") {
    matches = countries.filter(query);
  }

  useEffect(() => {
    getAll().then((allCountries) => setCountries(new Countries(allCountries)));
  }, []);

  return (
    <>
      <Search query={query} setQuery={setQuery} />
      {query === "" ? (
        <p>Specify filter</p>
      ) : (
        <FoundInformation foundCountries={matches} />
      )}
    </>
  );
};

export default App;
