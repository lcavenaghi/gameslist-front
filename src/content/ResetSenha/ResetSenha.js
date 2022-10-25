import React, { useState } from 'react';
import {
  Form,
  Stack,
  TextInput,
  Button,
  Column,
  InlineNotification
} from '@carbon/react';

const ResetSenha = () => {
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setmensagemDeErro] = useState('');
  

  const onSubmitClick = (e) => {
    e.preventDefault();
    let opts = {
      'token': new URL(window.location.href).searchParams.get('token'),
      'senha': senha
    }
    fetch(process.env.REACT_APP_API_URL + '/senha', {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then((response) => {
      if (!response.ok) {
        console.log("oi");
        return response.text().then(text => {
          console.log(text)
          text = JSON.parse(text)
          if (Object.hasOwn(text, 'errorMessage')) {
            setmensagemDeErro(text.errorMessage);
            throw new Error(text.errorMessage);
          }
          else {
            text = JSON.stringify(text)
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
          <Form onSubmit={onSubmitClick}>
            <Stack gap={7}>
              <TextInput id="senha" placeholder="Digite sua nova senha" required labelText="Senha" onChange={handleSenhaChange} value={senha} type="password" />
            </Stack>
            <section className="areaBotoes">
              <Button kind="primary" type="submit" id="botaoDireita">
                Alterar a senha
              </Button>
            </section>
            {mensagemDeErro === "" || mensagemDeErro === undefined ? <></> : <InlineNotification hideCloseButton={true} role="status" subtitle={mensagemDeErro} timeout={0} title="Erro ao alterar senha:" />}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetSenha;
