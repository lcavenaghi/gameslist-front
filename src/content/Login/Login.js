import React from 'react';
import {
  FormGroup,
  Stack,
  Link,
  TextInput,
  Button
} from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

const Login = () => {
  return (
    <div className="grupo">
      <div className="links">
        <Link href="#" renderIcon={ArrowRight}>
          Continuar com google
        </Link>
      </div>
      <FormGroup legendText="" hasmargin="">
        <Stack gap={7}>
          <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" />
          <TextInput id="senha" type="password" placeholder="Digite sua senha" required labelText="Senha" />
        </Stack>
        <section className="areaBotoes">
          <Button kind="secondary" id="esqueciSenha">
            Esqueci a senha
          </Button>
          <Button kind="primary">
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
  );
};

export default Login;
