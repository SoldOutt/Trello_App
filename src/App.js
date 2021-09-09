import './App.scss'
import React from 'react'
import Navbar from './components/Navbar/Navbar'

import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import AuthContextProvider from './contexts/AuthContext'
import ProtectRouter from './router/ProtectRouter'
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <div className="App">
                    <Navbar></Navbar>
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
                </div>
            </Router>
        </AuthContextProvider>
    )
}

export default App
