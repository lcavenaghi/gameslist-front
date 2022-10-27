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



export class EditaNoticia extends React.Component {
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
            titulo: "",
            data: "",
            resumo: "",
            link: ""
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/noticia/' + new URL(window.location.href).searchParams.get('id'), {
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
            this.setState({ titulo: response.titulo, data: this.desformataData(response.data), resumo: response.resumo, link: response.link, loadingAtivo: false });
        })
    }


    handleTituloChange = (e) => {
        this.setState({ titulo: e.target.value });
    }

    handleDataChange = (e) => {
        this.setState({ data: document.getElementById("data").value });
    }

    handleResumoChange = (e) => {
        this.setState({ resumo: e.target.value });
    }

    handleLinkChange = (e) => {
        this.setState({ link: e.target.value });
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        let opts = {
            'titulo': this.state.titulo,
            'data': this.formataData(this.state.data),
            'resumo': this.state.resumo,
            'link': this.state.link
        }
        fetch(process.env.REACT_APP_API_URL + '/noticia/' + new URL(window.location.href).searchParams.get('id'), {
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
            window.location.href = '/noticias'
        })
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Grid className="landing-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="landing-page__banner">
                        <h1 className="landing-page__heading">
                            Noticias
                        </h1>
                    </Column>
                    <Column lg={8} md={8} sm={4}>
                        <Form onSubmit={this.onSubmitClick} className="formRegistro">
                            <Stack gap={7}>
                                <TextInput id="titulo" placeholder="Digite o título" required labelText="Título:" onChange={this.handleTituloChange} value={this.state.titulo} />
                                <DatePicker datePickerType="single" onChange={this.handleDataChange}>
                                    <DatePickerInput
                                        labelText="Data:"
                                        id="data"
                                        size="md"
                                        value={this.state.data}
                                    />
                                </DatePicker>
                                <TextInput id="resumo" placeholder="Digite o resumo" required labelText="Resumo:" onChange={this.handleResumoChange} value={this.state.resumo} />
                                <TextInput id="link" placeholder="Digite o link" required labelText="Link:" onChange={this.handleLinkChange} value={this.state.link} />
                            </Stack>
                            <br />
                            <Stack gap={2} orientation="horizontal">
                                <Button href="/noticias" kind="secondary">
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