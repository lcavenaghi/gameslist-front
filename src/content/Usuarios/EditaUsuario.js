import React from 'react';
import {
    Button,
    Form,
    TextInput,
    Column,
    Loading,
    Grid,
    Stack
} from '@carbon/react';



export class EditaUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingAtivo: false,
            email: "",
            tipoDeAcesso: ""
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/usuario/' + new URL(window.location.href).searchParams.get('id'), {
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
            this.setState({ email: response.email, tipoDeAcesso: response.tipoDeAcesso, loadingAtivo: false });
        })
    }


    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleTipoDeAcessoChange = (e) => {
        this.setState({ tipoDeAcesso: e.target.value });
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        let opts = {
            'tipoDeAcesso': this.state.tipoDeAcesso,
        }
        fetch(process.env.REACT_APP_API_URL + '/usuario/' + new URL(window.location.href).searchParams.get('id'), {
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
            window.location.href = '/usuarios'
        })
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Grid className="landing-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="landing-page__banner">
                        <h1 className="landing-page__heading">
                            Usuários
                        </h1>
                    </Column>
                    <Column lg={8} md={8} sm={4}>
                        <Form onSubmit={this.onSubmitClick} className="formRegistro">
                            <Stack gap={7}>
                                <TextInput id="email" placeholder="Digite o email" required labelText="Usuário:" onChange={this.handleEmailChange} value={this.state.email} disabled/>
                                <TextInput id="tipoDeAcesso" placeholder="Digite o tipo de acesso" required labelText="Tipo de Acesso:" onChange={this.handleTipoDeAcessoChange} value={this.state.tipoDeAcesso} />
                            </Stack>
                            <br />
                            <Stack gap={2} orientation="horizontal">
                                <Button href="/usuarios" kind="secondary">
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