import React, { Component } from 'react'
import LogoCol from '../assets/Logo-col.png'
export default class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="left-area d-flex">
                        <img className="logo-col" src={LogoCol}/>
                    </div>
                    <div className="right-area d-flex ml-auto">
                        <button  className="logout-btn btn-primary rounded" value="Logout">
                            Logout
                        </button>
                    </div>
            </header>
            </div>
        )
    }
}
