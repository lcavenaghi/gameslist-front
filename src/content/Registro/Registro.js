import React from 'react';
import {
  FormGroup,
  Stack,
  TextInput,
  Button,
  Column
} from '@carbon/react';

const Registro = () => {
  return (
    <div className="externalContainer">
      <div class="container">
        <Column className="login-page__banner">
          <h1 className="login-page__heading">
            Registro
          </h1>
        </Column>
        <div className="formLogin">
          <FormGroup>
            <Stack gap={7}>
              <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" />
              <TextInput id="Nome" placeholder="Digite seu nome" required labelText="Nome:" />
              <TextInput id="Sobrenome" placeholder="Digite seu sobrenome" required labelText="Sobrenome:" />
              <TextInput id="senha" type="password" placeholder="Digite sua senha" required labelText="Senha" />
            </Stack>
            <section className="areaBotoes">
              <Button href="/#/login" kind="secondary" id="botaoEsquerda">
                Voltar
              </Button>
              <Button kind="primary" id="botaoDireita">
                Registrar
              </Button>
            </section>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Registro;
