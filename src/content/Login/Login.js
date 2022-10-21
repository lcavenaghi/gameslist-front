import React, { useState } from 'react';
import {
  Form,
  Stack,
  Link,
  TextInput,
  Button,
  Column,
  InlineNotification
} from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setmensagemDeErro] = useState('')

  const onSubmitClick = (e) => {
    e.preventDefault();
    let opts = {
      'email': email,
      'senha': senha
    }
    fetch(process.env.REACT_APP_API_URL + '/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          text = JSON.parse(text)
          if (Object.hasOwn(text, 'errorMessage')) {
            setmensagemDeErro(text.errorMessage)
            throw new Error(text.errorMessage);
          }
          else{
            text = JSON.stringify(text)
            setmensagemDeErro(text)
            throw new Error(text);
          }
        })
      }
      else {
        return response.json();
      }
    }).then(data => {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      window.location.href = '/'
    })
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSenhaChange = (e) => {
    setSenha(e.target.value)
  }

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
          <Form onSubmit={onSubmitClick}>
            <Stack gap={7}>
              <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" onChange={handleEmailChange} value={email} />
              <TextInput id="senha" placeholder="Digite sua senha" required labelText="Senha" onChange={handleSenhaChange} value={senha} type="password" />
            </Stack>
            <section className="areaBotoes">
              <Button kind="secondary" id="botaoEsquerda">
                Esqueci a senha
              </Button>
              <Button kind="primary" type="submit" id="botaoDireita">
                Acessar
              </Button>
            </section>
            {mensagemDeErro === "" || mensagemDeErro === undefined ? <></> : <InlineNotification hideCloseButton={true} role="status" subtitle={mensagemDeErro} timeout={0} title="Erro ao realizar o login:" />}
          </Form>
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
