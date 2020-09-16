import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons"
import { PartnerList } from '../../components/PartnerList'

export default class AdminPartner extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-content">
                    {/*<div>
                        <h1 className="admin-partner-header">Các công ty đối tác</h1>
                        <input type="text" className="admin-partner-search-input" placeholder="Tên công ty"/>
                        <button type="button" className="admin-partner-search-button"><FontAwesomeIcon icon={faSearch}/></button>
                    </div>
                    <button type="button" className="admin-partner-button"><FontAwesomeIcon icon={faPlusCircle} className="admin-partner-icon"/></button>
                    <button type="button" className="admin-partner-button">Công ty TNHH A</button>
                    <button type="button" className="admin-partner-button">Công ty TNHH B</button>*/}
                    <div>
                        <h1 className="admin-partner-header">Các công ty đối tác</h1>
                        <PartnerList/>
                    </div>
                </div>
            </div>
        )
    }
}
