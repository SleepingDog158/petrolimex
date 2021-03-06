import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import { PartnerList } from '../../components/PartnerList'

export default class AdminPartner extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-content">
                    <div>
                        <h1 className="admin-partner-header">
                            Các công ty đối tác
                        </h1>
                        <PartnerList/>
                    </div>
                </div>
            </div>
        )
    }
}
