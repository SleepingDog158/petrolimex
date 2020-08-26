import React, { Component } from 'react'
import "./NavBar.css"
import LogoCol from "../assets/Logo-col.png"

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <a href=""><img src={LogoCol} alt="logo" id="logo"/></a>
                <nav id="nav-item">
                    <ul>
                        <li><a href="#">Đối tác</a></li>
                        <li><a href="#">Chi nhánh</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Thống kê</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
