import React, { useState } from 'react';
import {
  Stack,
  TextInput,
  Button,
  Column,
  Form,
  InlineNotification
} from '@carbon/react';

const Registro = () => {
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemDeErro, setmensagemDeErro] = useState('')

  const onSubmitClick = (e) => {
    console.log("maoe");
    e.preventDefault();
    let opts = {
      'email': email,
      'nome': nome,
      'sobrenome': sobrenome,
      'senha': senha,
      'tipoDeAcesso': "usuario"
    }
    fetch(process.env.REACT_APP_API_URL + '/usuarios', {
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

  const handleNomeChange = (e) => {
    setNome(e.target.value)
  }

  const handleSobrenomeChange = (e) => {
    setSobrenome(e.target.value)
  }

  const handleSenhaChange = (e) => {
    setSenha(e.target.value)
  }
  

  return (
    <div className="externalContainer">
      <div className="container">
        <Column className="login-page__banner">
          <h1 className="login-page__heading">
            Registro
          </h1>
        </Column>
        <div className="formLogin">
          <Form onSubmit={onSubmitClick}>
            <Stack gap={7}>
              <TextInput id="email" placeholder="Digite seu email" required labelText="Email:" onChange={handleEmailChange} value={email} />
              <TextInput id="nome" placeholder="Digite seu nome" required labelText="Nome:" onChange={handleNomeChange} value={nome} />
              <TextInput id="sobrenome" placeholder="Digite seu sobrenome" required labelText="Sobrenome:" onChange={handleSobrenomeChange} value={sobrenome} />
              <TextInput id="senha" type="password" placeholder="Digite sua senha" required labelText="Senha" onChange={handleSenhaChange} value={senha} />
            </Stack>
            <section className="areaBotoes">
              <Button href="/#/login" kind="secondary" id="botaoEsquerda">
                Voltar
              </Button>
              <Button kind="primary" type="submit" id="botaoDireita">
                Registrar
              </Button>
            </section>
            {mensagemDeErro === "" || mensagemDeErro === undefined ? <></> : <InlineNotification hideCloseButton={true} role="status" subtitle={mensagemDeErro} timeout={0} title="Erro ao realizar o registro:" />}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
