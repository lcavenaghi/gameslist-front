import React, { useState } from 'react';
import {
  Form,
  Stack,
  TextInput,
  Button,
  Column,
  InlineNotification
} from '@carbon/react';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('')
  const [mensagemDeErro, setmensagemDeErro] = useState('')

  const onSubmitClick = (e) => {
    e.preventDefault();
    let opts = {
      'email': email
    }
    fetch(process.env.REACT_APP_API_URL + '/senha', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          text = JSON.parse(text);
          if (Object.hasOwn(text, 'errorMessage')) {
            setmensagemDeErro(text.errorMessage);
            throw new Error(text.errorMessage);
          }
          else{
            text = JSON.stringify(text);
            setmensagemDeErro(text);
            throw new Error(text);
          }
        })
      }
      else {
        return response.json();
      }
    }).then(data => {
      window.location.href = '/'
    })
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
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
          <Form onSubmit={onSubmitClick}>
            <Stack gap={7}>
              <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" onChange={handleEmailChange} value={email} />
            </Stack>
            <section className="areaBotoes">
              <Button kind="primary" type="submit" id="botaoDireita">
                Enviar email
              </Button>
            </section>
            {mensagemDeErro === "" || mensagemDeErro === undefined ? <></> : <InlineNotification hideCloseButton={true} role="status" subtitle={mensagemDeErro} timeout={0} title="Erro ao fazer a requisição:" />}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
