import React, { useState, useEffect, useMemo } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import PieChart from '../../components/PieChart'
import axios from 'axios'

export const AdminPartnerMain = () => {

    const [partner, setPartner] = useState([]);
    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getClients/", {clientId: 1});
        console.log(result.data.clients);
        setPartner(result.data.clients);
    }, []);

    const partnerData = useMemo(() => {
        let processedPartner = partner;
        return processedPartner.slice();
    }, [partner]); 

    return (
        <div>
            <NavBar/>
            <div className="admin-partner-main-content">
                {partnerData.map((partner) => (
                <div className="admin-partner-main-left-content">
                <h2 className="admin-partner-main-header">
                    {partner.name}
                </h2>
                    <table className="admin-partner-main-table">
                        <tr>
                            <th colSpan="2" className="admin-partner-main-table-header">
                                Thông tin công ty
                            </th> 
                        </tr>
                        <tr>
                            <td>
                                Mã công ty:
                            </td>
                            <td>
                                {partner.code}
                            </td> 
                        </tr>
                        <tr>
                            <td>
                                Địa chỉ:
                            </td>
                            <td>
                                {partner.address}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Mã số thuế:
                            </td>
                            <td>
                                {partner.taxId}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Hạn mức công nợ (VNĐ):
                            </td>
                            <td>
                                {partner.max_payment_limit}
                            </td>
                        </tr>
                    </table>
                    <div className="admin-partner-main-grid">
                        <a href={`/admin/partner/${partner.clientId}/contract`} className="admin-partner-main-grid-button">
                            Hợp đồng
                        </a>
                        <a href={`/admin/partner/${partner.clientId}/driver`} className="admin-partner-main-grid-button">
                            Tài xế
                        </a>
                        <a href={`/admin/partner/${partner.clientId}/bill`} className="admin-partner-main-grid-button">
                            Giao dịch
                        </a>
                        <a href={`/admin/partner/${partner.clientId}/contract`} className="admin-partner-main-grid-button">
                            Thống kê chi tiết
                        </a>
                    </div>
                </div>
                ))}
                <div className="admin-partner-main-chart">
                    <PieChart/>
                </div>
            </div>
        </div>
    )
}
