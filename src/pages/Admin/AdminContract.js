import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { ContractListAdmin } from '../../components/ContractListAdmin'

export default class AdminContract extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-contract-content">
                    <h1 className="admin-contract-header">Danh sách hợp đồng</h1>
                    <ContractListAdmin/>
                </div>
            </div>
        )
    }
}
