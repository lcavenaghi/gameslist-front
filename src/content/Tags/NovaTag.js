import React, { useState } from 'react';
import {
    Button,
    Form,
    TextInput,
    Column,
    Loading,
    Grid,
    Stack
} from '@carbon/react';



const NovaTag = () => {
    const [nome, setNome] = useState('')
    const [loadingAtivo, setLoadingAtivo] = useState(false)

    const onSubmitClick = (e) => {
        setLoadingAtivo(true);
        e.preventDefault();
        let opts = {
            'nome': nome
        }
        fetch(process.env.REACT_APP_API_URL + '/tags', {
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
            window.location.href = '/tags'
        })
    }

    const handleNomeChange = (e) => {
        setNome(e.target.value)
    }

    return (
        <>
            <Loading active={loadingAtivo}></Loading>
            <Grid className="landing-page" fullWidth>
                <Column lg={16} md={8} sm={4} className="landing-page__banner">
                    <h1 className="landing-page__heading">
                        Tags
                    </h1>
                </Column>
                <Column lg={8} md={8} sm={4}>
                    <Form onSubmit={onSubmitClick} className="formRegistro">
                        <Stack gap={7}>
                            <TextInput id="nome" placeholder="Digite o Nome" required labelText="Nome:" onChange={handleNomeChange} value={nome} />
                        </Stack>
                        <br />
                        <Stack gap={2} orientation="horizontal">
                            <Button href="/tags" kind="secondary">
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

export default NovaTag;