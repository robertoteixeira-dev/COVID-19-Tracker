import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card } from '@mui/material';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
  //State is how to write a variable in React
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  //https://disease.sh/v3/covid-19/countries

  // UseEffect runs a piece of code based on a given condition
  useEffect(() => {
    // The code inside here will run once when the component loads and not again. Only once.
    // async -> send a request, wait for it, do something with the info
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">

      <div className="app_left">

        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app-dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* 
            Loop through all the countries and show a 
           drop down list of the options
          */}

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          {/* InfoBoxs */}
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />

          <InfoBox title="Recovered" cases={123} total={2000} />

          <InfoBox title="Deaths" cases={123} total={2000} />

        </div>

        <Map />

      </div>

      <Card className="app_right">

      </Card>

    </div>
  );
}

export default App;

/* STEPS */
/* Header */
/* Title + Select input dropdown field */
/* InfoBoxs */
/* InfoBoxs */
/* InfoBoxs */
/* Table */
/* Graph */
/* Maps */