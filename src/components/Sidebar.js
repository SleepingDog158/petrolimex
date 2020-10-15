import React, { Component } from 'react'
import './Client.css'
import {faClipboard ,faFileAlt  ,faFileContract, faBus, faCogs, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoCol from "../assets/Logo-col.png"

export default class Sidebar extends Component {
    render() {
        return (
                <div className="sidebar">
                    <a href="/">
                        <FontAwesomeIcon icon={faDesktop} />
                        <span>Dashboard</span>
                    </a>
                    <a href="/contract">
                        <FontAwesomeIcon icon={faFileContract} />
                        <span>Hợp đồng</span>
                    </a>
                    <a href="/driver">
                        <FontAwesomeIcon icon={faBus} />
                        <span>Tài xế</span>
                    </a>
                    <a href="/bill">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Giao dịch</span>
                    </a>
                    <a href="/report">
                        <FontAwesomeIcon icon={faClipboard} />
                        <span>Báo cáo công nợ</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faCogs} />
                        <span>Cài đặt</span>
                    </a>
                </div>
            
        )
    }
}
