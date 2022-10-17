import React from 'react';
import {
  Column
} from '@carbon/react';
import { InfoSection, InfoCard } from '../../components/Info';
import { Globe, Application } from '@carbon/react/icons';

const Footer = () => (
  <Column lg={16} md={8} sm={4} className="landing-page__r3 zeromargem">
    <InfoSection heading="Sobre">
            <InfoCard
        heading="Projeto criado para o curso Desenvolvimento Web Full Stack"
              body="Esse projeto foi criado para a matéria do trabalho de conclusão de curso em Desenvolvimento Web Full Stack da PUC Minas Virtual"
        icon={() => <Application size={32} />}
      />
      <InfoCard
        heading="React, Carbon, Python, Flask, Heroku, Github, MongoDB"
        body="Para a criação, gerenciamento e manutenção do projeto, foram utilizadas os frameworks de desenvolvimento React, Carbon, Python e Flask.
      Além disso também é utilizado o MongoDB para acessos no banco de dados, Heroku como cloud server e github como repositório."
        icon={() => <Globe size={32} />}
      />
    </InfoSection>
  </Column>
);

export default Footer;