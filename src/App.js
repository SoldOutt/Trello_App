import './App.scss'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import ToolBar from './components/ToolBar/ToolBar'
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
function App() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <div className="App">
                            <Navbar></Navbar>
                            <Home></Home>
                        </div>
                    )}
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    path="/board"
                    render={(props) => (
                        <div className="App">
                            <Navbar></Navbar>
                            <ToolBar></ToolBar>
                            <Dashboard></Dashboard>
                        </div>
                    )}
                />
            </Switch>
        </Router>
    )
}

export default App
