import React, { useState } from 'react';
import {
  Form,
  Stack,
  TextInput,
  Button,
  Column,
  InlineNotification,
  Loading
} from '@carbon/react';

const ResetSenha = () => {
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setmensagemDeErro] = useState('');
  const [loadingAtivo, setLoadingAtivo] = useState(false)


  const onSubmitClick = (e) => {
    setLoadingAtivo(true);
    e.preventDefault();
    let opts = {
      'token': new URL(window.location.href).searchParams.get('token'),
      'senha': senha
    }
    fetch(process.env.REACT_APP_API_URL + '/senha', {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    }).then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          text = JSON.parse(text)
          if (Object.hasOwn(text, 'errorMessage')) {
            setmensagemDeErro(text.errorMessage);
            setLoadingAtivo(false);
            throw new Error(text.errorMessage);
          }
          else {
            text = JSON.stringify(text)
            setmensagemDeErro(text);
            setLoadingAtivo(false);
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
      <Loading active={loadingAtivo}></Loading>
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
