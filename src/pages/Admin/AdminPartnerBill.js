import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { BillListPartner } from "../../components/BillListPartner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class AdminPartnerBill extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-bill-content">
                    <a href="/partner-main"><FontAwesomeIcon icon={faAngleLeft}/>Đối tác</a>
                    <h1 className="admin-partner-bill-header">Lịch sử giao dịch của công ty</h1>
                    <BillListPartner/>
                </div>
            </div>
        )
    }
}
