import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AppHeader = () => (
  <Header as="h2" icon textAlign="center">
    <Icon name="flag" />
    <Header.Content>Top 10 Countries Covid-19</Header.Content>
    <Header.Subheader>
      How different countries are performing against Covid
    </Header.Subheader>
  </Header>
);

export default AppHeader;
