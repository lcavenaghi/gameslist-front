import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { tokenAutenticado } from '../../util/checaPerfil';


const PublicRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                tokenAutenticado(localStorage.getItem('token')) ? (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PublicRouter;