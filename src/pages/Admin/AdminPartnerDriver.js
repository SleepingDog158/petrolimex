import React, { Component } from 'react'
import { DriverListPartner } from '../../components/DriverListPartner'
import NavBar from '../../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class AdminPartnerDriver extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-driver-content">
                    <a href="/partner-main" className="admin-partner-return-button"><FontAwesomeIcon icon={faAngleLeft}/>Đối tác</a>
                    <h1 className="admin-partner-driver-header">Danh sách tài xế của công ty</h1>
                    <DriverListPartner/>
                </div>
            </div>
        )
    }
}
