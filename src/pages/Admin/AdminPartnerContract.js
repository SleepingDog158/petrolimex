import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { ContractListPartner } from "../../components/ContractListPartner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class AdminPartnerContract extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-contract-content">
                    <a href="/partner-main" className="admin-partner-return-button"><FontAwesomeIcon icon={faAngleLeft}/> Đối tác</a>
                    <h1 className="admin-partner-contract-header">Danh sách hợp đồng của công ty</h1>
                    <ContractListPartner/>
                </div>
            </div>
        )
    }
}
