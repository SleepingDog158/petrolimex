import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminPartnerMain.css"
import PieChart from '../../components/PieChart'

export default class AdminPartnerMain extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-main-content">
                    <h2 className="admin-partner-main-header">Công ty TNHH A</h2>
                    <div className="admin-partner-main-left-content">
                        <table>
                            <tr>
                                <th colSpan="1">Thông tin công ty</th> 
                            </tr>
                            <tr>
                                <td>Mã công ty:</td>
                                <td>12786372</td> 
                            </tr>
                            <tr>
                                <td>Địa chỉ:</td>
                                <td>Số 3 Tôn Thất Thuyết</td>
                            </tr>
                            <tr>
                                <td>Mã số thuế:</td>
                                <td>12778125</td>
                            </tr>
                            <tr>
                                <td>Hạn mức công nợ (VNĐ):</td>
                                <td>10.000.000.000</td>
                            </tr>
                            <tr>
                                <td>Mã đăng nhập:</td>
                                <td>17254712    </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
