import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import * as R from 'ramda';
import {Card, Header, Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Top10Card} from './Top10Card.js';

function App() {

    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://coronavirus-19-api.herokuapp.com/countries',
            );
            // console.log('result',result);
            setCountriesData(result.data);
        };
        fetchData();
    }, []);


    const notCountry = ["North America", "Europe", "Asia", "South America", "Africa", "Total:", "Oceania", "World", ""];
    const cleanCountryF = R.filter(
        c => R.not(R.includes(c.country, notCountry)));

    const cleanCountries = cleanCountryF(countriesData);

    console.debug('countriesData', countriesData);
    console.debug('cleanCountries', cleanCountries);


    const mkView = country => field =>
        R.merge(R.objOf("name", R.prop("country", country)), R.objOf("value", R.prop(field, country)));


    const sortedBy = field => R.sortWith([R.descend(R.prop(field))],cleanCountries);
    const take10By = field => R.take(10, sortedBy(field));

    const takeBy10View = field => R.map(country => mkView(country)(field), take10By(field));


    const top10ByCases = takeBy10View("cases");
    const top10ByDeaths = takeBy10View("deaths");
    const top10ByTodayCases = takeBy10View("todayCases");
    const top10ByTodayDeaths = takeBy10View("todayDeaths");
    const top10ByRecovered = takeBy10View("recovered");
    const top10ByActive = takeBy10View("active");
    const top10ByCritical = takeBy10View("critical");
    const top10ByCasesPerOneMillion = takeBy10View("casesPerOneMillion");
    const top10ByDeathsPerOneMillion = takeBy10View("deathsPerOneMillion");
    const top10ByTotalTests = takeBy10View("totalTests");
    const top10ByTestsPerOneMillion = takeBy10View("testsPerOneMillion");

    return (
        <div className="App">
            <Header as='h2' icon>
                <Icon name='flag'/>
                Top 10 Countries Covid-19
                <Header.Subheader>
                    How different countries are performing against Covid
                </Header.Subheader>
            </Header>

            <Card.Group>
                <Top10Card label='Total cases' countries={top10ByCases}/>
                <Top10Card label='Total deaths' countries={top10ByDeaths}/>
                <Top10Card label='Total tests' countries={top10ByTotalTests}/>
                <Top10Card label='Today cases' countries={top10ByTodayCases}/>
                <Top10Card label='Today deaths' countries={top10ByTodayDeaths}/>
                <Top10Card label='Recovered' countries={top10ByRecovered}/>
                <Top10Card label='Active' countries={top10ByActive}/>
                <Top10Card label='Critical cases' countries={top10ByCritical}/>
                <Top10Card label='Critical cases per 1M' countries={top10ByCasesPerOneMillion}/>
                <Top10Card label='Deaths per 1M' countries={top10ByDeathsPerOneMillion}/>
                <Top10Card label='Tests per 1M' countries={top10ByTestsPerOneMillion}/>
            </Card.Group>
        </div>
    );
}

export default App;
