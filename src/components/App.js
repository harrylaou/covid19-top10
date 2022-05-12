import React, {useEffect, useState} from "react";
import axios from "axios";
import {descend, filter, includes, map, not, prop, sortWith, take} from "ramda";
import AppHeader from "./AppHeader";
import Top10Card from "./Top10Card.js";
import {APIURL, nonCountries} from "../constants/";
import {Card} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [countriesData, setCountriesData] = useState([]);

  // Fetch and store data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(APIURL);
      // console.debug("data", data);
      setCountriesData(data);
    };
    fetchData();
  }, []);

  // Filter data
  const cleanCountryF = filter((c) =>
    not(includes(c.country, nonCountries))
  );
  const cleanCountries = cleanCountryF(countriesData);
  const mkView = (country) => (field) =>
  {
    return {
      name: prop("country", country),
      value:  prop(field, country),
    };
  };
  const sortedBy = (field) =>
    sortWith([descend(prop(field))], cleanCountries);
  const take10By = (field) => take(10, sortedBy(field));

  // Get data
  const takeBy10View = (field) =>
    map((country) => {

      const result =mkView(country)(field)
      // console.debug("takeBy10View", result);
      return result
    }, take10By(field));

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

  // console.debug("dataPairs", dataPairs);

  // Render data
  return (
    <div>
      <AppHeader />
      <Card.Group centered stackable>
        {map(
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
