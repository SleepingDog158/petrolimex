import React, { Component } from 'react'
import LogoCol from '../assets/Logo-col.png'
import './Client.css'
import { AuthContext } from "../contexts/Auth";
export default class PageHeader extends Component {
    render() {
        let auth = this.context;
        return (
            
            <div>
                <header>
                    <div className="left-area d-flex">
                        <img className="logo-col" src={LogoCol}/>
                    </div>
                    <div className="right-area d-flex ml-auto">
                        <button className="logout-btn btn-primary rounded" value="Logout" onClick={auth.onLogout}>
                            Logout
                        </button>
                    </div>
            </header>
            </div>
        )
    }
}

PageHeader.contextType= AuthContext