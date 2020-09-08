import React, { Component } from 'react'
import "./NavBar.css"
import LogoCol from "../assets/Logo-col.png"

export default class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <nav>
                    <ul className="nav-content">
                        <li className='list-content'>
                            <a href="/" className="navbar-prop"><img src={LogoCol} alt="logo" id="logo"/></a>
                        </li>
                        <li className='list-content'>
                            <a href="/partner-main" className="nav-items navbar-prop">Đối tác</a>
                        </li>
                        <li className='list-content'>
                            <a href="/station" className="nav-items navbar-prop">Chi nhánh</a>
                        </li>
                        <li className='list-content'>
                            <a href="/product" className="nav-items navbar-prop">Sản phẩm</a>
                        </li>
                        <li className='list-content'>
                            <a href="/stat" className="nav-items navbar-prop">Thống kê</a>
                        </li>
                        <li className='list-content'>
                            <a href="" className="nav-items navbar-prop">Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
