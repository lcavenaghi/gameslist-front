import React from 'react';
import {
  Grid,
  Column
} from '@carbon/react';

const Footer = () => (
  <Grid className="landing-page" fullWidth>
    <Column lg={16} md={8} sm={4} className="landing-page__r3">
      <h3> Sobre </h3>
      <p>Projeto criado para o curso Desenvolvimento Web Full Stack para a matéria do trabalho de conclusão de curso em Desenvolvimento Web Full Stack da PUC Minas Virtual.</p>
      <p>Para a criação, gerenciamento e manutenção do projeto, foram utilizadas os frameworks de desenvolvimento React, Carbon, Python e Flask. Além disso também é utilizado o MongoDB para acessos no banco de dados, Heroku como cloud server e github como repositório.</p>
    </Column>
  </Grid>
);

export default Footer;