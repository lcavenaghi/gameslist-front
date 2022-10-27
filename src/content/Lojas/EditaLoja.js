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



export class EditaLoja extends React.Component {
    formataData(data) {
        data = data.split("/");
        return (`${data[2]}-${data[0]}-${data[1]}`)
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: false,
            nome: "",
            fundacao: "",
            link: ""
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/loja/' + new URL(window.location.href).searchParams.get('id'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    text = JSON.parse(text);
                    throw new Error(text);
                })
            }
            else {
                return response.json();
            }
        }).then(response => {
            this.setState({ nome: response.nome, fundacao: response.fundacao, link: response.link, loadingAtivo: false });
        })
    }


    handleNomeChange = (e) => {
        this.setState({ nome: e.target.value });
    }

    handleFundacaoChange = (e) => {
        this.setState({ fundacao: document.getElementById("fundacao").value });
    }

    handleLinkChange = (e) => {
        this.setState({ link: e.target.value });
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        let opts = {
            'nome': this.state.nome,
            'fundacao': this.formataData(this.state.fundacao),
            'link': this.state.link
        }
        fetch(process.env.REACT_APP_API_URL + '/loja/' + new URL(window.location.href).searchParams.get('id'), {
            method: 'PATCH',
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
                        this.setState({ loadingAtivo: false });
                        throw new Error(text.errorMessage);
                    }
                    else {
                        text = JSON.stringify(text);
                        this.setState({ loadingAtivo: false });
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

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Grid className="landing-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="landing-page__banner">
                        <h1 className="landing-page__heading">
                            Lojas
                        </h1>
                    </Column>
                    <Column lg={8} md={8} sm={4}>
                        <Form onSubmit={this.onSubmitClick} className="formRegistro">
                            <Stack gap={7}>
                                <TextInput id="nome" placeholder="Digite o nome" required labelText="Nome:" onChange={this.handleNomeChange} value={this.state.nome} />
                                <DatePicker datePickerType="single" onChange={this.handleFundacaoChange}>
                                    <DatePickerInput
                                        labelText="Fundação:"
                                        id="fundacao"
                                        size="md"
                                        value={this.state.fundacao}
                                    />
                                </DatePicker>
                                <TextInput id="link" placeholder="Digite o link" required labelText="Link:" onChange={this.handleLinkChange} value={this.state.link} />
                            </Stack>
                            <br />
                            <Stack gap={2} orientation="horizontal">
                                <Button href="/lojas" kind="secondary">
                                    Cancelar
                                </Button>
                                <Button kind="primary" type="submit">
                                    Editar
                                </Button>
                            </Stack>
                        </Form>
                    </Column>
                </Grid>
            </>
        );
    }
}