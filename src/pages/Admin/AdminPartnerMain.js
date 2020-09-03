import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminPartnerMain.css"

export default class AdminPartnerMain extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-main-content">
                    <h2 className="admin-partner-main-header">Công ty TNHH A</h2>
                </div>
            </div>
        )
    }
}
