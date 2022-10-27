import React from 'react';
import {
  Grid,
  Column,
} from '@carbon/react';
import { TabelaDesenvolvedoras } from './TabelaDesenvolvedoras';

const Desenvolvedoras = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <h1 className="landing-page__heading">
          Desenvolvedoras
        </h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid className="tabs-group-content">
          <Column
            lg={16}
            md={8}
            sm={4}
            className="landing-page__tab-content">
            <TabelaDesenvolvedoras />
          </Column>
        </Grid>
      </Column>
    </Grid>
  );
};

export default Desenvolvedoras;
