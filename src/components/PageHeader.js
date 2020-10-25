import React, { Component } from 'react'
import LogoCol from '../assets/Logo-col.png'
import './Client.css'
export default class PageHeader extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="left-area d-flex">
                        <img className="logo-col" src={LogoCol}/>
                    </div>
                    <div className="right-area d-flex ml-auto">
                        <button className="logout-btn btn-primary rounded" value="Logout">
                            Logout
                        </button>
                    </div>
            </header>
            </div>
        )
    }
}
