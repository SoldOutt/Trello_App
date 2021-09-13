import './App.scss'
import React from 'react'
import Navbar from './components/Navbar/Navbar'

import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import AuthContextProvider from './contexts/AuthContext'
import ProtectRouter from './router/ProtectRouter'
import Login from './components/Login/Login'
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <div className="App">
                    <Navbar></Navbar>
                    <Switch>
                        <Route exact path="/login" component={Login}></Route>
                        <ProtectRouter
                            exact
                            path="/"
                            render={(props) => (
                                <>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/"
                                            render={(props) => <Home></Home>}
                                        />
                                    </Switch>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/board/:id"
                                            render={(props) => (
                                                <>
                                                    <Dashboard></Dashboard>
                                                </>
                                            )}
                                        />
                                    </Switch>
                                </>
                            )}
                        />
                    </Switch>
                </div>
            </Router>
        </AuthContextProvider>
    )
}

export default App
