import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@mui/material';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        //All of the data
        //All of the data from the country
        setCountryInfo(data);
      })
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>

        <Map />

      </div>

      <Card className="app_right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          {/* Graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph />

        </CardContent>
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
/* Maps */

/* Table */
/* Graph */

//State is how to write a variable in React
 // UseEffect runs a piece of code based on a given condition
// The code inside here will run once when the component loads and not again. Only once.
 // async -> send a request, wait for it, do something with the info

  //https://disease.sh/v3/covid-19/countries


