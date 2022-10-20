import React from 'react';
import {
  FormGroup,
  Stack,
  TextInput,
  Button
} from '@carbon/react';

const Registro = () => {
  return (
    <div class="grupoRegistro">
      <FormGroup>
        <Stack gap={7}>
          <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" />
          <TextInput id="Nome" placeholder="Digite seu nome" required labelText="Nome:" />
          <TextInput id="Sobrenome" placeholder="Digite seu sobrenome" required labelText="Sobrenome:" />
          <TextInput id="senha" type="password" placeholder="Digite sua senha" required labelText="Senha" />
        </Stack>
        <section class="areaBotoes">
          <Button kind="primary">
            Registrar
          </Button>
        </section>
      </FormGroup>
    </div>
  );
};

export default Registro;
