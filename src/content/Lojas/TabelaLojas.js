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
import { Edit, TrashCan } from '@carbon/react/icons';

function apagar(id) {
    alert("apagando " + id)
}

function editar(id) {
    alert("editando " + id)
}

export class TabelaLojas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
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
            this.setState({ data: response, loadingAtivo: false });
        })
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Table size="lg" useZebraStyles={false}>
                    <TableHead>
                        <TableRow key="headers">
                            <TableHeader id="nome" key="nome">
                                Nome
                            </TableHeader>
                            <TableHeader id="fundacao" key="fundacao">
                                Fundação
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
                        {this.state.data.map(loja =>
                            <TableRow key={loja._id}>
                                <TableCell key={loja.nome}>{loja.nome}</TableCell>
                                <TableCell key={loja.fundacao}>{loja.fundacao}</TableCell>
                                <TableCell key={loja.link}><a target="_blank" rel="noreferrer" href={loja.link}>{loja.link}</a></TableCell>
                                <TableCell key="editar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { editar(loja._id) }}
                                    />
                                </TableCell>
                                <TableCell key="apagar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { apagar(loja._id) }}
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