import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminPartner.css"

export default class AdminPartner extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-content">
                    <h1>Các công ty đối tác</h1>
                    <table className='admin-table-content'>
                        <tr>
                            <th className="admin-table-header">Tên Công Ty</th>
                            <th className="admin-table-header">Địa Chỉ</th>
                            <th className="admin-table-header">Hạn Mức</th>
                            <th className="admin-table-header"></th>
                        </tr>
                        <tr>
                            <td className="admin-table-row">Công ty THHH A</td>
                            <td className="admin-table-row">Số 3 Tôn Thất Thuyết</td>
                            <td className="admin-table-row">200.000.000 VND</td>
                            <td className="admin-table-row">
                                <button type='button'>Xem chi tiết</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="admin-table-row">Công ty THHH B</td>
                            <td className="admin-table-row">Số 3 Tôn Thất Thuyết</td>
                            <td className="admin-table-row">1.000.000.000 VND</td>
                            <td className="admin-table-row">
                                <button type='button'>Xem chi tiết</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
