import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { tokenAutenticado } from '../../util/checaPerfil';


const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                tokenAutenticado(localStorage.getItem('token')) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRouter;