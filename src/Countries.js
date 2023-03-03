const hardcore = [
  { name: { common: "Gambia" } },
  { name: { common: "Gvinea" } },
  { name: { common: "DydyaSlavia" } },
];

class Countries {
  constructor(countriesAPI) {
    this._countries = countriesAPI.map((country) => {
      return {
        name: country.name.common,
        capital: country.capital[0],
        area: country.area,
        languages: Array.from(Object.values(country.languages)),
        flag: country.flags.svg,
      };
    });
  }
  getNames() {}
}

const Search = () => {
  return (
    <>
      <label for="searchField">Find country:</label>
      <input id="searchField" />
    </>
  );
};

const CountryInformation = ({ country }) => {
  return <></>;
};

const TooManyMatches = () => {
  return <p>too many matches, specify another filter</p>;
};

const CountriesList = ({ countryNames }) => {
  return <></>;
};

const FoundInformation = () => {
  const countries = [];
  const numberOfMatches = 20; // test value
  if (numberOfMatches > 10) return <TooManyMatches />;
  if (numberOfMatches > 1)
    return (
      <CountriesList countryNames={countries.map((country) => country.name)} />
    );
  if (numberOfMatches === 1)
    return <CountryInformation country={countries[0]} />;

  throw Error("Dead point in FoundInformation component");
};

const App = () => {
  return (
    <>
      <h1>Stub</h1>
      <Search />
      <FoundInformation />
    </>
  );
};

export default App;
