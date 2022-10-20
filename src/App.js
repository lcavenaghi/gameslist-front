import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Footer from './components/Footer';

import LandingPage from './content/LandingPage';
import Login from './content/Login';
import Registro from './content/Registro';
import Acessos from './content/Acessos';
import Desenvolvedoras from './content/Desenvolvedoras';
import Jogos from './content/Jogos';
import Lojas from './content/Lojas';
import Noticias from './content/Noticias';
import Plataformas from './content/Plataformas';
import Tags from './content/Tags';

class App extends Component {
  render() {
    return (
      <>
        <Theme theme="g100">
          <MainHeader />
        </Theme>
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/acessos" component={Acessos} />
            <Route exact path="/desenvolvedoras" component={Desenvolvedoras} />
            <Route exact path="/jogos" component={Jogos} />
            <Route exact path="/lojas" component={Lojas} />
            <Route exact path="/noticias" component={Noticias} />
            <Route exact path="/plataformas" component={Plataformas} />
            <Route exact path="/tags" component={Tags} />
          </Switch>
        </Content>        
        <Footer />
      </>
    );
  }
}

export default App;
