import React from 'react';
import { Card ,Table, Flag} from 'semantic-ui-react';
import * as R from 'ramda';
import {getCountryCode} from './CountyNames';
export const Top10Card = (props) => {
    return (
        <Card centered>
            <Card.Content>

                <Card.Header>{props.label}</Card.Header>
                <Card.Description>
                    <Table>
                        <Table.Body>


                            {
                                R.map((country) => (
                                    <Table.Row key={country.name}>
                                        <Table.Cell><Flag name={getCountryCode(country.name)}/></Table.Cell>
                                        <Table.Cell>{country.name}</Table.Cell>
                                        <Table.Cell>{country.value}</Table.Cell>
                                    </Table.Row>
                                ), props.countries)
                            }
                        </Table.Body>
                    </Table>
                </Card.Description>
            </Card.Content>

        </Card>
    );

};
