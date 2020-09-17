import React, { Component } from 'react'
import { DriverListPartner } from '../../components/DriverListPartner'
import NavBar from '../../components/NavBar'

export default class AdminPartnerDriver extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    <h1>Danh sách tài xế của công ty</h1>
                    <DriverListPartner/>
                </div>
            </div>
        )
    }
}
