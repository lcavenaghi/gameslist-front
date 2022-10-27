import React from 'react';
import {
  Grid,
  Column
} from '@carbon/react';
import { BlocoJogos } from './BlocoJogos'



const Jogos = () => {
  return (
    <>
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <h1 className="landing-page__heading">
            Jogos
          </h1>
        </Column>
      </Grid>
      <Grid fullWidth className="conteudoNoticias">
        <BlocoJogos />
      </Grid>
    </>
  );
};

export default Jogos;
