import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Footer from './components/Footer';
import PrivateRouter from './components/PrivateRouter';

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
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registro" component={Registro} />
          <Content>
            <Theme theme="g100">
              <MainHeader />
            </Theme>
            <PrivateRouter exact path="/" component={LandingPage} />
            <PrivateRouter exact path="/acessos" component={Acessos} />
            <PrivateRouter exact path="/desenvolvedoras" component={Desenvolvedoras} />
            <PrivateRouter exact path="/jogos" component={Jogos} />
            <PrivateRouter exact path="/lojas" component={Lojas} />
            <PrivateRouter exact path="/noticias" component={Noticias} />
            <PrivateRouter exact path="/plataformas" component={Plataformas} />
            <PrivateRouter exact path="/tags" component={Tags} />
            <Footer />
          </Content>
        </Switch>
      </>
    );
  }
}

export default App;
