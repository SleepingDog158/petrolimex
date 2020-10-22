import React, { useEffect, useState } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import GasPriceTable from '../../components/GasPriceTable'
import axios from 'axios'

export const AdminMain = () => {

    const [partner, setPartner] = useState([]);
    const [contract, setContract] = useState([]);
    const [activeContract, setActiveContract] = useState([]);
    const [station, setStation] = useState([]);
    const [bill, setBill] = useState([]);

    useEffect(async () => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/partner");
        console.log(result.data);
        setPartner(result.data);
    }, []);
    useEffect(async () => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/contract");
        console.log(result.data);
        setContract(result.data);
        setActiveContract(result.data.filter((c) => c.contract_status === "active"));
    }, []);
    useEffect(async () => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/station");
        console.log(result.data);
        setStation(result.data);
    }, []);
    useEffect(async () => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/bill");
        console.log(result.data);
        setBill(result.data);
    }, []);

    return (
        <div>
            <NavBar/>
            <div className="admin-main-content">
                <h1 className="admin-main-header">Trang chủ</h1>
                <div className="admin-main-grid">
                    <div className="admin-main-grid-item1">
                        <h4>Đối tác</h4>
                        <div>{partner.length} công ty đối tác<br/>50 có hợp đồng</div>
                        <a href="/partner"><button className="admin-main-grid-button">Xem thêm</button></a>
                    </div>
                    <div className="admin-main-grid-item2">
                        <h4>Hợp đồng</h4>
                        <div>{contract.length} hợp đồng<br/>{activeContract.length} đang hoạt động</div>
                        <a href="/contract"><button className="admin-main-grid-button">Xem thêm</button></a>
                    </div>
                    <div className="admin-main-grid-item3">
                        <h4>Chi nhánh</h4>
                        <div>{station.length} chi nhánh<br/>160 đang mở cửa</div>
                        <a href="/station"><button className="admin-main-grid-button">Xem thêm</button></a>
                    </div>
                    <div className="admin-main-grid-item4">
                        <h4>Giao dịch</h4>
                        <div>{bill.length} giao dịch<br/>Trong 7 ngày</div>
                        <a href="/bill"><button className="admin-main-grid-button">Xem thêm</button></a>
                    </div>
                    <div className="admin-main-grid-item5">
                        <h4>Giá xăng dầu hiện tại</h4>
                        <GasPriceTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}
