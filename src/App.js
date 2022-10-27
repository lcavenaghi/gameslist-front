import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import { Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Footer from './components/Footer';
import PrivateRouter from './components/PrivateRouter';

import LandingPage from './content/LandingPage';
import Login from './content/Login';
import EsqueciSenha from './content/EsqueciSenha';
import ResetSenha from './content/ResetSenha';
import Registro from './content/Registro';
import Acessos from './content/Acessos';
import { Desenvolvedoras, EditaDesenvolvedora, NovaDesevolvedora } from './content/Desenvolvedoras';
import { EditaJogo, Jogos, NovoJogo } from './content/Jogos';
import { Lojas, NovaLoja, EditaLoja } from './content/Lojas';
import { Noticias, NovaNoticia, EditaNoticia } from './content/Noticias';
import { Plataformas, NovaPlataforma, EditaPlataforma } from './content/Plataformas';
import { Tags, EditaTag, NovaTag } from './content/Tags';
import PublicRouter from './components/PublicRouter';
import { EditaUsuario, Usuarios } from './content/Usuarios';

class App extends Component {
  render() {
    return (
      <>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <Switch>
          <PublicRouter exact path="/login" component={Login} />
          <PublicRouter exact path="/registro" component={Registro} />
          <PublicRouter exact path="/senha" component={EsqueciSenha} />
          <PublicRouter exact path="/resetsenha" component={ResetSenha} />
          <Content>
            <Theme theme="g100">
              <MainHeader />
            </Theme>
            <Switch>
              <PrivateRouter exact path="/" component={LandingPage} />

              <PrivateRouter exact path="/acessos" component={Acessos} />

              <PrivateRouter exact path="/jogos" component={Jogos} />
              <PrivateRouter exact path="/adicionajogo" component={NovoJogo} />
              <PrivateRouter exact path="/editajogo" component={EditaJogo} />

              <PrivateRouter exact path="/lojas" component={Lojas} />
              <PrivateRouter exact path="/adicionaloja" component={NovaLoja} />
              <PrivateRouter exact path="/editaloja" component={EditaLoja} />

              <PrivateRouter exact path="/desenvolvedoras" component={Desenvolvedoras} />
              <PrivateRouter exact path="/adicionadesenvolvedora" component={NovaDesevolvedora} />
              <PrivateRouter exact path="/editadesenvolvedora" component={EditaDesenvolvedora} />

              <PrivateRouter exact path="/noticias" component={Noticias} />
              <PrivateRouter exact path="/adicionanoticia" component={NovaNoticia} />
              <PrivateRouter exact path="/editanoticia" component={EditaNoticia} />

              <PrivateRouter exact path="/tags" component={Tags} />
              <PrivateRouter exact path="/adicionatag" component={NovaTag} />
              <PrivateRouter exact path="/editatag" component={EditaTag} />

              <PrivateRouter exact path="/plataformas" component={Plataformas} />
              <PrivateRouter exact path="/adicionaplataforma" component={NovaPlataforma} />
              <PrivateRouter exact path="/editaplataforma" component={EditaPlataforma} />


              <PrivateRouter exact path="/usuarios" component={Usuarios} />
              <PrivateRouter exact path="/editausuario" component={EditaUsuario} />
            </Switch>
            <Footer />
          </Content>
        </Switch>
      </>
    );
  }
}

export default App;
