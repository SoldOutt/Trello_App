import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <i className="fas fa-home"></i>
                </li>
                <li>
                    <i className="fas fa-border-all"></i>
                    <span>Bảng</span>
                </li>
                <li>
                    <div className="form_group">
                        <input type="text" placeholder="Chuyển đến" />
                        <i className="fas fa-search"></i>
                    </div>
                </li>
            </ul>
            <div className="logo">
                <Link to="/">Trello Clone</Link>
            </div>
            <ul className="nav_menu_2">
                <li>
                    <i className="fas fa-plus"></i>
                </li>
                <li>
                    <i className="fas fa-info-circle"></i>
                </li>
                <li>
                    <i className="far fa-bell"></i>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
