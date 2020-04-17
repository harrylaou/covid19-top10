import React from "react";
import { Card, Table, Flag, Loader } from "semantic-ui-react";
import { map } from "ramda";
import { getCountryCode } from "../utils/CountryNames";

const Top10Card = ({ label, countries }) => (
  <Card centered>
    <Card.Content>
      <Card.Header>{label}</Card.Header>
      <Card.Description>
        {countries.length < 1  &&  <Loader active inline='centered' />}
        {countries.length > 0 && (<Table>
          <Table.Body>
            {map(
              (country) => (
                <Table.Row key={country.name}>
                  <Table.Cell>
                    <Flag name={getCountryCode(country.name)} />
                  </Table.Cell>
                  <Table.Cell>{country.name}</Table.Cell>
                  <Table.Cell>{country.value}</Table.Cell>
                </Table.Row>
              ),
              countries
            )}
          </Table.Body>
        </Table>)}
      </Card.Description>
    </Card.Content>
  </Card>
);

export default Top10Card;
