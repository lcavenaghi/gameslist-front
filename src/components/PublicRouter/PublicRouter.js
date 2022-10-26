import React from 'react';
import { Redirect, Route} from 'react-router-dom';

const isAuthenticated = () => localStorage.getItem('token');

const PublicRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => 
                    isAuthenticated() ? (
                        <Redirect to={{pathname:"/", state: {from:props.location}}} />
                    ) : (
                        <Component {...props} />
                    )
                }
        />
    )
}

export default PublicRouter;