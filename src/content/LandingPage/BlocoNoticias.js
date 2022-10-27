import React from 'react';
import {
    Loading,
    ClickableTile,
    Column
} from '@carbon/react';

export class BlocoNoticias extends React.Component {
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
                {this.state.data.map(noticia =>
                    <Column
                        lg={4}
                        md={3}
                        sm={3}
                        className="blocoTiles">
                        <ClickableTile target="_blank" href={noticia.link}>
                            <h3>{noticia.titulo}</h3>
                            <p>{noticia.resumo}</p>
                            <br />
                            <p>Data de publicação: {noticia.data}</p>
                        </ClickableTile>
                    </Column>
                )}
            </>
        );
    }
}