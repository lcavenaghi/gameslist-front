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
    Dropdown,
    MultiSelect
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
            listaPlataformas: [],
            listaDesenvolvedoras: [],
            listaLojas: [],
            listaTags: []
        }
    }
    componentDidMount() {
        this.carregaPlataformas();
        this.carregaDesenvolvedoras();
        this.carregaLojas();
        this.carregaTags();
    }

    carregaPlataformas() {
        fetch(process.env.REACT_APP_API_URL + '/plataformas', {
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
            this.setState({ listaPlataformas: response.map((item) => { return { "id": item.nome, "label": item.nome } }) });
        })
    }

    carregaDesenvolvedoras() {
        fetch(process.env.REACT_APP_API_URL + '/desenvolvedoras', {
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
            this.setState({ listaDesenvolvedoras: response.map((item) => { return { "id": item.nome, "label": item.nome } }) });
        })
    }

    carregaLojas() {
        fetch(process.env.REACT_APP_API_URL + '/lojas', {
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
            this.setState({ listaLojas: response.map((item) => { return { "id": item.nome, "label": item.nome } }) });
        })
    }

    carregaTags() {
        fetch(process.env.REACT_APP_API_URL + '/tags', {
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
            this.setState({ listaTags: response.map((item) => { return { "id": item.nome, "label": item.nome } }) });
        })
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
        this.setState({ plataforma: e.selectedItem.id });
    }

    handleDesenvolvedoraChange = (e) => {
        this.setState({ desenvolvedora: e.selectedItem.id });
    }

    handleLojaChange = (e) => {
        this.setState({ loja: e.selectedItem.id });
    }

    handleTagsChange = (e) => {
        this.setState({ tags: e.selectedItems.map((item) => item.id) });
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
                                <Dropdown
                                    ariaLabel="Plataforma"
                                    id="plataforma"
                                    items={this.state.listaPlataformas}
                                    label="Selecione a plataforma"
                                    onChange={this.handlePlataformaChange}
                                    titleText="Plataforma:"
                                    value={this.state.plataforma}
                                />
                                <Dropdown
                                    ariaLabel="Desenvolvedora"
                                    id="desenvolvedora"
                                    items={this.state.listaDesenvolvedoras}
                                    label="Selecione a desenvolvedora"
                                    onChange={this.handleDesenvolvedoraChange}
                                    titleText="Desenvolvedora:"
                                    value={this.state.desenvolvedora}
                                />
                                <Dropdown
                                    ariaLabel="Loja"
                                    id="loja"
                                    items={this.state.listaLojas}
                                    label="Selecione a loja"
                                    onChange={this.handleLojaChange}
                                    titleText="Loja:"
                                    value={this.state.loja}
                                />
                                <TextInput id="link" placeholder="Digite o Link" required labelText="Link:" onChange={this.handleLinkChange} value={this.state.link} />
                                <MultiSelect
                                    ariaLabel="tag"
                                    id="tag"
                                    items={this.state.listaTags}
                                    label="Selecione as tags"
                                    onChange={this.handleTagsChange}
                                    titleText="Tags:"
                                    value={this.state.tags}
                                />
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
