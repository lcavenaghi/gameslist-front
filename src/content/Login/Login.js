import React from 'react';
import {
  FormGroup,
  Stack,
  Link,
  TextInput,
  Button,
  Column
} from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

const Login = () => {
  return (
    <div className="externalContainer">
      <div className="container">
        <Column className="login-page__banner">
          <h1 className="login-page__heading">
            Games List
          </h1>
        </Column>
        <div className="formLogin">
          <div className="links">
            <Link href="#" renderIcon={ArrowRight}>
              Continuar com Google
            </Link>
          </div>
          <FormGroup legendText="" hasmargin="">
            <Stack gap={7}>
              <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" />
              <TextInput id="senha" type="password" placeholder="Digite sua senha" required labelText="Senha" />
            </Stack>
            <section className="areaBotoes">
              <Button kind="secondary" id="botaoEsquerda">
                Esqueci a senha
              </Button>
              <Button kind="primary" id="botaoDireita">
                Acessar
              </Button>
            </section>
          </FormGroup>
          <div className="links">
            <Link href="/#/registro" renderIcon={ArrowRight}>
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
