import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminPartner.css"

export default class AdminPartner extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div class="admin-partner-content">
                    <h1>Các công ty đối tác</h1>
                    <table class='admin-table-content'>
                        <tr>
                            <th class="admin-table-header">Tên Công Ty</th>
                            <th class="admin-table-header">Địa Chỉ</th>
                            <th class="admin-table-header">Hạn Mức</th>
                            <th class="admin-table-header"></th>
                        </tr>
                        <tr>
                            <td class="admin-table-row">Công ty THHH A</td>
                            <td class="admin-table-row">Số 3 Tôn Thất Thuyết</td>
                            <td class="admin-table-row">200.000.000 VND</td>
                            <td class="admin-table-row"><button type='button'>Xem chi tiết</button></td>
                        </tr>
                        <tr>
                            <td class="admin-table-row">Công ty THHH B</td>
                            <td class="admin-table-row">Số 3 Tôn Thất Thuyết</td>
                            <td class="admin-table-row">1.000.000.000 VND</td>
                            <td class="admin-table-row"><button type='button'>Xem chi tiết</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
