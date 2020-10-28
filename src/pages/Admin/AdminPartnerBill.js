import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { BillListPartner } from "../../components/BillListPartner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import {useParams} from "react-router-dom"
export default function AdminPartnerBill() {
        let {clientId}=useParams()
        console.log(clientId)
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-bill-content">
                    <a href="/partner-main" className="admin-partner-return-button">
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        Đối tác
                    </a>
                    <h1 className="admin-partner-bill-header">
                        Lịch sử giao dịch của công ty
                    </h1>
                    <BillListPartner clientId={clientId}/>
                </div>
            </div>
        )
    
}
