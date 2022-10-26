import React from 'react';
import {
  Grid,
  Column
} from '@carbon/react';
import { TabelaAcessos } from './TabelaAcessos';

const Acessos = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <h1 className="landing-page__heading">
          Acessos
        </h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid className="tabs-group-content">
          <Column
            lg={16}
            md={8}
            sm={4}
            className="landing-page__tab-content">
            <TabelaAcessos />
          </Column>
        </Grid>
      </Column>
    </Grid>
  );
};

export default Acessos;
