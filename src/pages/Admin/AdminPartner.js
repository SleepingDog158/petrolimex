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
                    <table class='table-content'>
                        <tr>
                            <th>Tên Công Ty</th>
                            <th>Địa Chỉ</th>
                            <th>Hạn Mức</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Công ty THHH A</td>
                            <td>Số 3 Tôn Thất Thuyết</td>
                            <td>200.000.000 VND</td>
                            <td><button type='button'>Xem chi tiết</button></td>
                        </tr>
                        <tr>
                            <td>Công ty THHH B</td>
                            <td>Số 3 Tôn Thất Thuyết</td>
                            <td>1.000.000.000 VND</td>
                            <td><button type='button'>Xem chi tiết</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
