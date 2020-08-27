import React, { Component } from 'react'
import "./NavBar.css"
import LogoCol from "../assets/Logo-col.png"

export default class NavBar extends Component {
    render() {
        return (
            <div class="nav-bar">
                <nav>
                    <ul>
                        <li><a href=""><img src={LogoCol} alt="logo" id="logo"/></a></li>
                        <li><a href="#" class="nav-items">Đối tác</a></li>
                        <li><a href="#" class="nav-items">Chi nhánh</a></li>
                        <li><a href="#" class="nav-items">Sản phẩm</a></li>
                        <li><a href="#" class="nav-items">Thống kê</a></li>
                        <li><a href="#" class="nav-items">Logout</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
