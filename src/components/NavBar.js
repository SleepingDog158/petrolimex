import React, { Component } from 'react'
import "./NavBar.css"
import LogoCol from "../assets/Logo-col.png"
import { Navbar } from 'reactstrap'
import { AuthContext } from "../contexts/Auth";
export default class NavBar extends Component {
    render() {
        let auth = this.context;
        return (
            <div className="nav-bar">
                <nav>
                    <ul className="nav-content">
                        <li className='list-content'>
                            <a href="/" className="navbar-prop">
                                <img src={LogoCol} alt="logo" id="logo"/>
                            </a>
                        </li>
                        <li className='list-content'>
                            <a href="/admin/partner" className="nav-items navbar-prop">
                                Đối tác
                            </a>
                        </li>
                        <li className='list-content'>
                            <a href="/admin/station" className="nav-items navbar-prop">
                                Chi nhánh
                            </a>
                        </li>
                        <li className='list-content'>
                            <a href="/admin/product" className="nav-items navbar-prop">
                                Sản phẩm
                            </a>
                        </li>
                        <li className='list-content'>
                            <a href="/admin/bill" className="nav-items navbar-prop">
                                Giao dịch
                            </a>
                        </li>
                        <li className='list-content'>
                            <a href="/admin/contract" className="nav-items navbar-prop">
                                Hợp đồng
                            </a>
                        </li>
                        <li className='list-content'>
                            <button className="logout-button" value="Logout" onClick={auth.onLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
NavBar.contextType= AuthContext