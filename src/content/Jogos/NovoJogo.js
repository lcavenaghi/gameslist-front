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
    DatePickerInput,
    ComboBox,
    DropDown
} from '@carbon/react';



export class NovoJogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingAtivo: false,
            nome: "",
            dataLancamento: "",
            descricao: "",
            link: "",
            plataforma: "",
            desenvolvedora: "",
            loja: "",
            tags: "",
            listaPlataformas: [{ "content": "plataforma 1", "value": "plataforma 1" }],
            listaDesenvolvedoras: "",
            listaLojas: "",
            listaTags: ""
        }
    }
    componentDidMount() {
        console.log("vou fazer o fetch")
    }

    onSubmitClick = (e) => {
        this.setState({ loadingAtivo: true });
        e.preventDefault();
        let opts = {
            'nome': this.state.nome,
            'dataLancamento': this.formataData(this.state.dataLancamento),
            'descricao': this.state.descricao,
            'link': this.state.link,
            'plataforma': this.state.plataforma,
            'desenvolvedora': this.state.desenvolvedora,
            'loja': this.state.loja,
            'tags': this.state.tags,
        }
        fetch(process.env.REACT_APP_API_URL + '/jogos', {
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
            window.location.href = '/jogos'
        })
    }

    handleNomeChange = (e) => {
        this.setState({ nome: e.target.value });
    }

    handleDataLancamentoChange = (e) => {
        this.setState({ dataLancamento: document.getElementById("dataLancamento").value });
    }

    handleDescricaoChange = (e) => {
        this.setState({ descricao: e.target.value });
    }

    handleLinkChange = (e) => {
        this.setState({ link: e.target.value });
    }

    handlePlataformaChange = (e) => {
        this.setState({ plataforma: e.target.value });
    }

    handleDesenvolvedoraChange = (e) => {
        this.setState({ desenvolvedora: e.target.value });
    }

    handleLojaChange = (e) => {
        this.setState({ loja: e.target.value });
    }

    handleTagsChange = (e) => {
        this.setState({ tags: e.target.value });
    }

    formataData(data) {
        data = data.split("/");
        return (`${data[2]}-${data[0]}-${data[1]}`);
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Grid className="landing-page" fullWidth>
                    <Column lg={16} md={8} sm={4} className="landing-page__banner">
                        <h1 className="landing-page__heading">
                            Jogos
                        </h1>
                    </Column>
                    <Column lg={8} md={8} sm={4}>
                        <Form onSubmit={this.onSubmitClick} className="formRegistro">
                            <Stack gap={7}>
                                <TextInput id="nome" placeholder="Digite o Nome" required labelText="Nome:" onChange={this.handleNomeChange} value={this.state.nome} />
                                <DatePicker datePickerType="single" onChange={this.handleDataLancamentoChange}>
                                    <DatePickerInput
                                        labelText="Publicação:"
                                        id="dataLancamento"
                                        size="md"
                                        value={this.state.dataLancamento}
                                    />
                                </DatePicker>
                                <TextInput id="descricao" placeholder="Digite a Descrição" required labelText="Descrição:" onChange={this.handleDescricaoChange} value={this.state.descricao} />
                                <TextInput id="link" placeholder="Digite o Link" required labelText="Link:" onChange={this.handleLinkChange} value={this.state.link} />
                                <TextInput id="plataforma" placeholder="Digite a Plataforma" required labelText="Plataforma:" onChange={this.handlePlataformaChange} value={this.state.plataforma} />
                                <TextInput id="desenvolvedora" placeholder="Digite a Desenvolvedora" required labelText="Desenvolvedora:" onChange={this.handleDesenvolvedoraChange} value={this.state.desenvolvedora} />
                                <TextInput id="loja" placeholder="Digite a Loja" required labelText="Loja:" onChange={this.handleLojaChange} value={this.state.loja} />
                                <TextInput id="tags" placeholder="Digite as Tags" required labelText="Tags:" onChange={this.handleTagsChange} value={this.state.tags} />
                            </Stack>
                            <br />
                            <Stack gap={2} orientation="horizontal">
                                <Button href="/jogos" kind="secondary">
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
}
