import './App.scss'
import Navbar from './components/Navbar/Navbar'
import ToolBar from './components/ToolBar/ToolBar'
import Dashboard from './components/Dashboard/Dashboard'
function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <ToolBar></ToolBar>
            <Dashboard></Dashboard>
        </div>
    )
}

export default App
