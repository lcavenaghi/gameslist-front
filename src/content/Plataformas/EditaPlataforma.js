import React from 'react';
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



export class EditaPlataforma extends React.Component {
    formataData(data) {
        data = data.split("/");
        return (`${data[2]}-${data[0]}-${data[1]}`);
    }

    desformataData(data) {
        data = data.split("-");
        return (`${data[1]}/${data[2]}/${data[0]}`);
    }

    constructor(props) {
        super(props);
        this.state = {
            loadingAtivo: false,
            nome: "",
            dataDeLancamento: "",
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/plataforma/' + new URL(window.location.href).searchParams.get('id'), {
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
            this.setState({ nome: response.nome, dataDeLancamento: this.desformataData(response.dataDeLancamento), loadingAtivo: false });
        })
    }


    handleNomeChange = (e) => {
        this.setState({ nome: e.target.value });
    }

    handleDataDeLancamentoChange = (e) => {
        this.setState({ dataDeLancamento: document.getElementById("dataDeLancamento").value });
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        let opts = {
            'nome': this.state.nome,
            'dataDeLancamento': this.formataData(this.state.dataDeLancamento)
        }
        fetch(process.env.REACT_APP_API_URL + '/plataforma/' + new URL(window.location.href).searchParams.get('id'), {
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
            window.location.href = '/plataformas'
        })
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Grid className="landing-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="landing-page__banner">
                        <h1 className="landing-page__heading">
                            Plataformas
                        </h1>
                    </Column>
                    <Column lg={8} md={8} sm={4}>
                        <Form onSubmit={this.onSubmitClick} className="formRegistro">
                            <Stack gap={7}>
                                <TextInput id="nome" placeholder="Digite o título" required labelText="Título:" onChange={this.handleNomeChange} value={this.state.nome} />
                                <DatePicker datePickerType="single" onChange={this.handleDataDeLancamentoChange}>
                                    <DatePickerInput
                                        labelText="Data de lançamento:"
                                        id="dataDeLancamento"
                                        size="md"
                                        value={this.state.dataDeLancamento}
                                    />
                                </DatePicker>
                            </Stack>
                            <br />
                            <Stack gap={2} orientation="horizontal">
                                <Button href="/plataformas" kind="secondary">
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