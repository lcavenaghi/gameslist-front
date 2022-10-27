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


export class TabelaDesenvolvedoras extends React.Component {
    apagar(id) {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            this.setState({ loadingAtivo: true });
            fetch(process.env.REACT_APP_API_URL + '/desenvolvedora/' + id, {
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
        window.location.href = '/editadesenvolvedora?id=' + id
    }

    adicionar() {
        window.location.href = '/adicionadesenvolvedora'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
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
                            <TableHeader id="fundacao" key="fundacao">
                                Fundação
                            </TableHeader>
                            <TableHeader id="localizacao" key="localizacao">
                                Localização
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
                        {this.state.data.map(desenvolvedora =>
                            <TableRow id={"tablerow" + desenvolvedora._id} key={desenvolvedora._id}>
                                <TableCell key={desenvolvedora.nome}>{desenvolvedora.nome}</TableCell>
                                <TableCell key={desenvolvedora.fundacao}>{desenvolvedora.fundacao}</TableCell>
                                <TableCell key={desenvolvedora.localizacao}>{desenvolvedora.localizacao}</TableCell>
                                <TableCell key="editar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { this.editar(desenvolvedora._id) }}
                                    />
                                </TableCell>
                                <TableCell key="apagar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { this.apagar(desenvolvedora._id) }}
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