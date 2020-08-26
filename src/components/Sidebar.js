import React, { Component } from 'react'
import './Sidebar.css'
import {faFileAlt  ,faFileContract, faBus, faCogs, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoCol from "../assets/Logo-col.png"

export default class Sidebar extends Component {
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
                <div className="sidebar">
                    <a>
                        <FontAwesomeIcon icon={faDesktop} />
                        <span>Dashboard</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faFileContract} />
                        <span>Hợp đồng</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faBus} />
                        <span>Tài xế</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Giao dịch</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faCogs} />
                        <span>Cài đặt</span>
                    </a>
                </div>
                <div className="content"> asdasdjkashdjkasd</div>
            </div>
            
        )
    }
}
