import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { ContractListPartner } from "../../components/ContractListPartner"

export default class AdminPartnerContract extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    <h1>Danh sách hợp đồng của công ty</h1>
                    <ContractListPartner/>
                </div>
            </div>
        )
    }
}
