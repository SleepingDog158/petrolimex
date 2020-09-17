import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import PieChart from '../../components/PieChart'
import { Route, Redirect, Switch, BrowserRouter as Router } from "react-router-dom"
import { DriverListAdmin } from "../../components/DriverListPartner"

export default class AdminPartnerMain extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-partner-main-content">
                    <div className="admin-partner-main-left-content">
                    <h2 className="admin-partner-main-header">Công ty TNHH A</h2>
                        <table className="admin-partner-main-table">
                            <tr>
                                <th colSpan="2" className="admin-partner-main-table-header">Thông tin công ty</th> 
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
                                <td>17254712</td>
                            </tr>
                        </table>
                        <div className="admin-partner-main-grid">
                            <a href="/partner-contract" className="admin-partner-main-grid-button">Hợp đồng</a>
                            <a href="/partner-driver" className="admin-partner-main-grid-button">Tài xế</a>
                            <a href="/partner-bill" className="admin-partner-main-grid-button">Giao Dịch</a>
                            <a href="" className="admin-partner-main-grid-button">Thống kê chi tiết</a>
                        </div>
                    </div>
                    <div className="admin-partner-main-chart">
                        <PieChart/>
                    </div>
                </div>
            </div>
        )
    }
}
