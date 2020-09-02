import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminPartner.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default class AdminPartner extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-content">
                    <h1 className="admin-partner-header">Các công ty đối tác</h1>
                    <button type="button" class="admin-partner-button"><FontAwesomeIcon icon={faPlusCircle} className="admin-partner-icon"/></button>
                    <button type="button" className="admin-partner-button">Công ty TNHH A</button>
                    <button type="button" className="admin-partner-button">Công ty TNHH B</button>
                </div>
            </div>
        )
    }
}
