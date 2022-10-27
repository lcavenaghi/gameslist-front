import React from 'react';
import {
    Loading,
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Button
} from '@carbon/react';
import { Edit, TrashCan, Add } from '@carbon/react/icons';


export class TabelaNoticias extends React.Component {
    apagar(id) {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            this.setState({ loadingAtivo: true });
            fetch(process.env.REACT_APP_API_URL + '/noticia/' + id, {
                method: 'DELETE',
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
                    this.setState({ loadingAtivo: false });
                    this.forceUpdate();
                    document.getElementById("tablerow" + id).remove();
                }
            })
        }
    }

    editar(id) {
        window.location.href = '/editanoticia?id=' + id
    }

    adicionar() {
        window.location.href = '/adicionanoticia'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/noticias', {
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
            this.setState({ data: response, loadingAtivo: false });
        })
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Button kind="primary" renderIcon={Add} onClick={() => { this.adicionar() }}> Adicionar </Button>
                <Table size="lg" useZebraStyles={false}>
                    <TableHead>
                        <TableRow key="headers">
                            <TableHeader id="titulo" key="titulo">
                                Título
                            </TableHeader>
                            <TableHeader id="data" key="data">
                                Publicação
                            </TableHeader>
                            <TableHeader id="resumo" key="resumo">
                                Resumo
                            </TableHeader>
                            <TableHeader id="link" key="link">
                                Link
                            </TableHeader>
                            <TableHeader id="editar" key="editar">
                                Editar
                            </TableHeader>
                            <TableHeader id="apagar" key="apagar">
                                Apagar
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(noticia =>
                            <TableRow id={"tablerow" + noticia._id} key={noticia._id}>
                                <TableCell key={noticia.titulo}>{noticia.titulo}</TableCell>
                                <TableCell key={noticia.data}>{noticia.data}</TableCell>
                                <TableCell key={noticia.resumo}>{noticia.resumo}</TableCell>
                                <TableCell key={noticia.link}><a target="_blank" rel="noreferrer" href={noticia.link}>{noticia.link}</a></TableCell>
                                <TableCell key="editar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { this.editar(noticia._id) }}
                                    />
                                </TableCell>
                                <TableCell key="apagar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { this.apagar(noticia._id) }}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </>
        );
    }
}