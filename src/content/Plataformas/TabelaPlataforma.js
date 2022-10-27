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


export class TabelaPlataforma extends React.Component {
    apagar(id) {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            this.setState({ loadingAtivo: true });
            fetch(process.env.REACT_APP_API_URL + '/plataforma/' + id, {
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
        window.location.href = '/editaplataforma?id=' + id
    }

    adicionar() {
        window.location.href = '/adicionaplataforma'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
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
                            <TableHeader id="nome" key="nome">
                                Nome
                            </TableHeader>
                            <TableHeader id="dataDeLancamento" key="dataDeLancamento">
                                Data de Lançamento
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
                        {this.state.data.map(plataforma =>
                            <TableRow id={"tablerow" + plataforma._id} key={plataforma._id}>
                                <TableCell key={plataforma.nome}>{plataforma.nome}</TableCell>
                                <TableCell key={plataforma.dataDeLancamento}>{plataforma.dataDeLancamento}</TableCell>
                                <TableCell key="editar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { this.editar(plataforma._id) }}
                                    />
                                </TableCell>
                                <TableCell key="apagar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { this.apagar(plataforma._id) }}
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