import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
const ProtectRouter = ({ commponent: Component, ...rest }) => {
    const {
        authSate: { authLoading, isAuthenticated },
    } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className="center_box">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <Component {...rest} {...props} />{' '}
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default ProtectRouter
