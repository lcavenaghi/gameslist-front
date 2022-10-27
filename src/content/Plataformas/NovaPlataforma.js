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



const NovaPlataforma = () => {
    const [nome, setnomeNome] = useState('')
    const [dataDeLancamento, setDataDeLancamento] = useState('')
    const [loadingAtivo, setLoadingAtivo] = useState(false)

    const onSubmitClick = (e) => {
        setLoadingAtivo(true);
        e.preventDefault();
        let opts = {
            'nome': nome,
            'dataDeLancamento': formataDataDeLancamento(dataDeLancamento)
        }
        fetch(process.env.REACT_APP_API_URL + '/plataformas', {
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
        }).then(dataDeLancamento => {
            window.location.href = '/plataformas'
        })
    }

    const handlenomeNomeChange = (e) => {
        setnomeNome(e.target.value)
    }

    const handleDataDeLancamentoChange = (e) => {
        setDataDeLancamento(document.getElementById("dataDeLancamento").value)
    }

    const formataDataDeLancamento = (dataDeLancamento) => {
        dataDeLancamento = dataDeLancamento.split("/");
        return (`${dataDeLancamento[2]}-${dataDeLancamento[0]}-${dataDeLancamento[1]}`)
    }

    return (
        <>
            <Loading active={loadingAtivo}></Loading>
            <Grid className="landing-page" fullWidth>
                <Column lg={16} md={8} sm={4} className="landing-page__banner">
                    <h1 className="landing-page__heading">
                        Notícias
                    </h1>
                </Column>
                <Column lg={8} md={8} sm={4}>
                    <Form onSubmit={onSubmitClick} className="formRegistro">
                        <Stack gap={7}>
                            <TextInput id="nome" placeholder="Digite o Nome" required labelText="Nome:" onChange={handlenomeNomeChange} value={nome} />
                            <DatePicker datePickerType="single" onChange={handleDataDeLancamentoChange}>
                                <DatePickerInput
                                    labelText="Publicação:"
                                    id="dataDeLancamento"
                                    size="md"
                                    value={dataDeLancamento}
                                />
                            </DatePicker>
                        </Stack>
                        <br />
                        <Stack gap={2} orientation="horizontal">
                            <Button href="/plataformas" kind="secondary">
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

export default NovaPlataforma;