import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import MainHeader from './components/MainHeader';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';

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
          </Switch>
        </Content>        
        <Footer />
      </>
    );
  }
}

export default App;
