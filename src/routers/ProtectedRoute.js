import React from 'react';
import {  Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = (props) => {
    const token = localStorage.getItem('userToken')
    const {  component: Component, ...rest } = props;
    if (token) {
        return (
            <Route
                {...rest}
                render={matchProps => (
                   
                        <Component {...matchProps} />
                   
                )}
            />
        )
    } else {
        return <Redirect to="/login" />
    }
    
};

ProtectedRoute.propTypes = {
    component: PropTypes.any.isRequired,
    path: PropTypes.string
};
export default ProtectedRoute;