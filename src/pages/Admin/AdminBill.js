import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { BillListAdmin } from '../../components/BillListAdmin'

export default class AdminBill extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-bill-content">
                    <h1 className="admin-bill-header">
                        Lịch sử giao dịch
                    </h1>
                    <BillListAdmin/>
                </div>
            </div>
        )
    }
}
