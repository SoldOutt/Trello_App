import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import * as action from '../../actions/apiCall'
const Home = () => {
    const [allBoard, setAllBoard] = useState([])
    useEffect(() => {
        action.getAllBoard().then((boards) => {
            setAllBoard(boards)
            console.log(boards)
        })
    }, [])
    return (
        <div className="home">
            {allBoard.map((board) => (
                <Link to="/board/${board._id}">{board.title}</Link>
            ))}
        </div>
    )
}

export default Home
