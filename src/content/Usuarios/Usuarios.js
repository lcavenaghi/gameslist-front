import React from 'react';
import {
  Grid,
  Column,
} from '@carbon/react';
import { TabelaUsuarios } from './TabelaUsuarios';

const Tags = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <h1 className="landing-page__heading">
        Usuários
        </h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid className="tabs-group-content">
          <Column
            lg={16}
            md={8}
            sm={4}
            className="landing-page__tab-content">
              <TabelaUsuarios/>
            </Column>
        </Grid>
      </Column>
    </Grid>
  );
};

export default Tags;
