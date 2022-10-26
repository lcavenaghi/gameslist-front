import React, { useState } from 'react';
import {
    Button,
    Form,
    TextInput,
    Column,
    Loading,
    Grid,
    Stack,
    DatePicker,
    DatePickerInput
} from '@carbon/react';



const NovaLoja = () => {
    const [nome, setNome] = useState('')
    const [fundacao, setFundacao] = useState('')
    const [link, setLink] = useState('')
    const [loadingAtivo, setLoadingAtivo] = useState(false)

    const onSubmitClick = (e) => {
        setLoadingAtivo(true);
        e.preventDefault();
        let opts = {
            'nome': nome,
            'fundacao': formataData(fundacao),
            'link': link
        }
        fetch(process.env.REACT_APP_API_URL + '/lojas', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(opts)
        }).then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    text = JSON.parse(text);
                    if (Object.hasOwn(text, 'errorMessage')) {
                        setLoadingAtivo(false);
                        throw new Error(text.errorMessage);
                    }
                    else {
                        text = JSON.stringify(text);
                        setLoadingAtivo(false);
                        throw new Error(text);
                    }
                })
            }
            else {
                return response.json();
            }
        }).then(data => {
            window.location.href = '/lojas'
        })
    }

    const handleNomeChange = (e) => {
        setNome(e.target.value)
    }

    const handleFundacaoChange = (e) => {
        setFundacao(document.getElementById("fundacao").value)
        console.log(typeof document.getElementById("fundacao").value);
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const formataData = (data) => {
        data = data.split("/");
        return (`${data[2]}-${data[0]}-${data[1]}`)
    }

    return (
        <>
            <Loading active={loadingAtivo}></Loading>
            <Grid className="landing-page" fullWidth>
                <Column lg={16} md={8} sm={4} className="landing-page__banner">
                    <h1 className="landing-page__heading">
                        Lojas
                    </h1>
                </Column>
                <Column lg={8} md={8} sm={4}>
                    <Form onSubmit={onSubmitClick} className="formRegistro">
                        <Stack gap={7}>
                            <TextInput id="nome" placeholder="Digite o nome" required labelText="Nome:" onChange={handleNomeChange} value={nome} />
                            <DatePicker datePickerType="single" onChange={handleFundacaoChange}>
                                <DatePickerInput
                                    labelText="Fundação:"
                                    id="fundacao"
                                    size="md"
                                    value={fundacao}
                                />
                            </DatePicker>
                            <TextInput id="link" placeholder="Digite o link" required labelText="Link:" onChange={handleLinkChange} value={link} />
                        </Stack>
                        <br />
                        <Stack gap={2} orientation="horizontal">
                            <Button href="/lojas" kind="secondary">
                                Cancelar
                            </Button>
                            <Button kind="primary" type="submit">
                                Adicionar
                            </Button>
                        </Stack>
                    </Form>
                </Column>
            </Grid>
        </>
    );
}

export default NovaLoja;