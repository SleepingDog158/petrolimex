import React, { Component } from 'react'
import "./NavBar.css"
import LogoCol from "../assets/Logo-col.png"

export default class NavBar extends Component {
    render() {
        return (
            <div class="nav-bar">
                <nav>
                    <ul class="nav-content">
                        <li class='list-content'><a href="#" class="navbar-prop"><img src={LogoCol} alt="logo" id="logo"/></a></li>
                        <li class='list-content'><a href="#" class="nav-items navbar-prop">Đối tác</a></li>
                        <li class='list-content'><a href="#" class="nav-items navbar-prop">Chi nhánh</a></li>
                        <li class='list-content'><a href="#" class="nav-items navbar-prop">Sản phẩm</a></li>
                        <li class='list-content'><a href="#" class="nav-items navbar-prop">Thống kê</a></li>
                        <li class='list-content'><a href="#" class="nav-items navbar-prop">Logout</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
