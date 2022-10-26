import React from 'react';
import {
    Loading,
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell
} from '@carbon/react';

export class TabelaAcessos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/acessos', {
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
            this.setState({ data: response , loadingAtivo: false});
        })
    }

    render() {
        return (
            <Table size="lg" useZebraStyles={false}>
            <Loading active={this.state.loadingAtivo}></Loading>
                <TableHead>
                    <TableRow key="headers">
                        <TableHeader id="usuario" key="usuario">
                            Usuário
                        </TableHeader>
                        <TableHeader id="data" key="data">
                            Data de acesso
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.data.map((row) => (
                        <TableRow key={row.id}>
                            {Object.keys(row)
                                .map((key) => {
                                    return <TableCell key={key}>{row[key]}</TableCell>;
                                })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        );
    }
}