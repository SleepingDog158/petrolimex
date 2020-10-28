import React, { useEffect, useState, useMemo } from 'react'
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
        const result = await axios.post("http://localhost:6060/getClients/", {});
        console.log(result.data.clients);
        setPartner(result.data.clients);
      }, []);

      useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getContracts/", {});
        console.log(result.data.contracts);
        setContract(result.data.contracts);
        setActiveContract(result.data.contracts.filter((c) => c.status === "active"));
    }, []);

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getGasStations/", {});
        console.log(result.data.gasStations);
        setStation(result.data.gasStations);
    }, []);

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getBills/", {});
        console.log(result.data.bills);
        setBill(result.data.bills);
    }, []);

    const partnerData = useMemo(() => {
        let processedPartner = partner;
        return processedPartner.slice();
    }, [partner]);

    return (
        <div>
            <NavBar/>
            <div className="admin-main-content">
                <h1 className="admin-main-header">
                    Trang chủ
                </h1>
                <div className="admin-main-grid">
                    <div className="admin-main-grid-item1">
                        <h4>
                            Đối tác
                        </h4>
                        <div>
                            {partner.length} công ty đối tác<br/>
                            {partner.length} có hợp đồng
                        </div>
                        <a href="/admin/partner">
                            <button className="admin-main-grid-button">
                                Xem thêm
                            </button>
                        </a>
                    </div>
                    <div className="admin-main-grid-item2">
                        <h4>
                            Hợp đồng
                        </h4>
                        <div>
                            {contract.length} hợp đồng<br/>
                            {activeContract.length} đang hoạt động
                        </div>
                        <a href="/admin/contract">
                            <button className="admin-main-grid-button">
                                Xem thêm
                            </button>
                        </a>
                    </div>
                    <div className="admin-main-grid-item3">
                        <h4>
                            Chi nhánh
                        </h4>
                        <div>
                            {station.length} chi nhánh<br/>
                            {station.length} đang mở cửa
                        </div>
                        <a href="/admin/station">
                            <button className="admin-main-grid-button">
                                Xem thêm
                            </button>
                        </a>
                    </div>
                    <div className="admin-main-grid-item4">
                        <h4>
                            Giao dịch
                        </h4>
                        <div>
                            {bill.length} giao dịch<br/>
                            Trong 7 ngày
                        </div>
                        <a href="/admin/bill">
                            <button className="admin-main-grid-button">
                                Xem thêm
                            </button>
                        </a>
                    </div>
                    <div className="admin-main-grid-item5">
                        <h4>
                            Giá xăng dầu hiện tại
                        </h4>
                        <GasPriceTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}
