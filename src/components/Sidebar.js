import React, { Component } from 'react'
import './Client.css'
import {faClipboard ,faFileAlt  ,faFileContract, faBus, faCogs, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Sidebar extends Component {
    render() {
        return (
                <div className="sidebar">
                    <a href="/client">
                        <FontAwesomeIcon icon={faDesktop} />
                        <span>Dashboard</span>
                    </a>
                    <a href="/client/contract">
                        <FontAwesomeIcon icon={faFileContract} />
                        <span>Hợp đồng</span>
                    </a>
                    <a href="/client/driver">
                        <FontAwesomeIcon icon={faBus} />
                        <span>Tài xế</span>
                    </a>
                    <a href="/client/bill">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Giao dịch</span>
                    </a>
                    <a href="/client/report">
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
