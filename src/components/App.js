import React, { useState, useEffect } from "react";
import axios from "axios";
import * as R from "ramda";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import AppHeader from "./AppHeader";
import Top10Card from "./Top10Card.js";
import { nonCountries } from "../constants/countries";

const APIURL = "https://coronavirus-19-api.herokuapp.com/countries";

function App() {
  const [countriesData, setCountriesData] = useState([]);

  // Fetch and store data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(APIURL);
      setCountriesData(data);
    };

    fetchData();
  }, []);

  // Filter data
  const cleanCountryF = R.filter((c) =>
    R.not(R.includes(c.country, nonCountries))
  );
  const cleanCountries = cleanCountryF(countriesData);
  const mkView = (country) => (field) =>
    R.merge(
      R.objOf("name", R.prop("country", country)),
      R.objOf("value", R.prop(field, country))
    );
  const sortedBy = (field) =>
    R.sortWith([R.descend(R.prop(field))], cleanCountries);
  const take10By = (field) => R.take(10, sortedBy(field));

  // Get data
  const takeBy10View = (field) =>
    R.map((country) => mkView(country)(field), take10By(field));

  // Format data to pairs
  const dataPairs = [
    { name: "Total cases", count: takeBy10View("cases") },
    { name: "Total deaths", count: takeBy10View("deaths") },
    { name: "Total tests", count: takeBy10View("totalTests") },
    { name: "Today cases", count: takeBy10View("todayCases") },
    { name: "Today deaths", count: takeBy10View("todayDeaths") },
    { name: "Recovered", count: takeBy10View("recovered") },
    { name: "Active", count: takeBy10View("active") },
    { name: "Critical cases", count: takeBy10View("critical") },
    {
      name: "Critical cases per 1M",
      count: takeBy10View("casesPerOneMillion"),
    },
    { name: "Deaths per 1M", count: takeBy10View("deathsPerOneMillion") },
    { name: "Tests per 1M", count: takeBy10View("testsPerOneMillion") },
  ];

  // Render data
  return (
    <div>
      <AppHeader />

      <Card.Group centered stackable>
        {R.map(
          ({ name, count }) => (
            <Top10Card key={name} label={name} countries={count} />
          ),
          dataPairs
        )}
      </Card.Group>
    </div>
  );
}

export default App;
