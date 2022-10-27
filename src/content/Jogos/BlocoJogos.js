import React from 'react';
import {
    Loading,
    Tile,
    Column,
    Button,
    Stack
} from '@carbon/react';
import { Edit, TrashCan, Add, Star, StarFilled } from '@carbon/react/icons';
import { getEmail } from '../../util/checaPerfil';
import { CSVLink } from 'react-csv';

export class BlocoJogos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingAtivo: true
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/jogos', {
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

    editar(id) {
        window.location.href = '/editajogo?id=' + id
    }

    apagar(id) {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            this.setState({ loadingAtivo: true });
            fetch(process.env.REACT_APP_API_URL + '/jogo/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
                if (!response.ok) {
                    return response.text().then(text => {
                        this.setState({ loadingAtivo: false });
                        text = JSON.parse(text);
                        throw new Error(text);
                    })
                }
                else {
                    this.setState({ loadingAtivo: false });
                    this.forceUpdate();
                    document.getElementById("tile" + id).remove();
                }
            })
        }
    }
    adicionar() {
        window.location.href = '/adicionajogo'
    }

    favoritar(id, favoritos) {
        let novoFavorito = getEmail();
        if (favoritos) {
            if (favoritos.includes(novoFavorito)) {
                favoritos.splice(favoritos.indexOf(novoFavorito), 1);
            }
            else {
                favoritos.push(getEmail());
            }
        }
        else {
            favoritos = [getEmail()];
        }

        this.setState({ loadingAtivo: true });
        let opts = {
            'favoritos': favoritos
        }
        fetch(process.env.REACT_APP_API_URL + '/jogo/' + id, {
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
                    this.setState({ loadingAtivo: false });
                    text = JSON.parse(text);
                    throw new Error(text);
                })
            }
            else {
                this.setState({ loadingAtivo: false });
                this.forceUpdate();
            }
        })
    }

    favorito(favoritos) {
        if (!favoritos) {
            return Star;
        }
        else if (favoritos.includes(getEmail())) {
            return StarFilled;
        }
        else
            return Star;
    }

    render() {
        return (
            <>
                <Loading active={this.state.loadingAtivo}></Loading>
                <Column lg={16} md={8} sm={4}>
                    <Stack gap={2} orientation="horizontal">
                        <Button kind="primary" renderIcon={Add} onClick={() => { this.adicionar() }}> Adicionar </Button>
                        <CSVLink className="cds--btn cds--btn--secondary" data={this.state.data} >
                            Exportar jogos
                        </CSVLink>

                    </Stack>
                </Column>
                {this.state.data.map(jogo =>
                    <Column
                        lg={8}
                        md={4}
                        sm={4}
                        className="blocoTiles">
                        <Tile id={"tile" + jogo._id}>
                            <h3>{jogo.nome}</h3>
                            <p><strong>Lançamento:</strong> {jogo.dataLancamento}</p>
                            <p><strong>Descrição:</strong> {jogo.descricao}</p>
                            <p><strong>Plataforma:</strong> {jogo.plataforma}</p>
                            <p><strong>Desenvolvido por :</strong> {jogo.desenvolvedora}</p>
                            <p><strong>Comprar:</strong> <a target="_blank" rel="noreferrer" href={jogo.link}>{jogo.loja}</a></p>
                            <p><strong>Tags:</strong> {jogo.tags.join(', ')}</p>
                            <div className='areaBotoesTile'>
                                <Stack gap={2} orientation="horizontal">
                                    <Button
                                        hasIconOnly
                                        kind="secondary"
                                        renderIcon={this.favorito(jogo.favoritos)}
                                        iconDescription="Favoritar"
                                        onClick={() => { this.favoritar(jogo._id, jogo.favoritos) }}
                                    />
                                    <Button
                                        hasIconOnly
                                        kind="primary"
                                        renderIcon={Edit}
                                        iconDescription="Editar"
                                        onClick={() => { this.editar(jogo._id) }}
                                    />
                                    <Button
                                        hasIconOnly
                                        kind="danger"
                                        renderIcon={TrashCan}
                                        iconDescription="Apagar"
                                        onClick={() => { this.apagar(jogo._id) }}
                                    />
                                </Stack>
                            </div>
                        </Tile>
                    </Column>
                )}
            </>
        );
    }
}