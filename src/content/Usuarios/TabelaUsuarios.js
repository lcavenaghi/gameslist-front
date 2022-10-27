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


export class TabelaUsuarios extends React.Component {
    apagar(id) {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            this.setState({ loadingAtivo: true });
            fetch(process.env.REACT_APP_API_URL + '/usuario/' + id, {
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
        window.location.href = '/editausuario?id=' + id
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/usuarios', {
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
                            <TableHeader id="email" key="email">
                                Usuário
                            </TableHeader>
                            <TableHeader id="tipoDeAcesso" key="tipoDeAcesso">
                                Tipo de acesso
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
                        {this.state.data.map(usuario =>
                            <TableRow id={"tablerow" + usuario._id} key={usuario._id}>
                                <TableCell key={usuario.email}>{usuario.email}</TableCell>
                                <TableCell key={usuario.tipoDeAcesso}>{usuario.tipoDeAcesso}</TableCell>
                                <TableCell key="editar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { this.editar(usuario._id) }}
                                    />
                                </TableCell>
                                <TableCell key="apagar">
                                    <Button
                                        hasIconOnly
                                        kind="ghost"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { this.apagar(usuario._id) }}
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