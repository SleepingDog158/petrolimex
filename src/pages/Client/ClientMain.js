import React, { useState, useMemo, useEffect, Component } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import PieChart from "../../components/PieChart";
import GasPriceTable from "../../components/GasPriceTable";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import {useCookies} from 'react-cookie'
export  const ClientMain = () => {
  const [drivers, setDrivers] = useState([]);
  const [cookies] = useCookies(['userId']);
  const [clientId, setClientId]=useState(null)
  console.log(cookies.userId)
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getClients", {
      userId: cookies.userId
    });
    console.log(result.data.clients[0].clientId);
    setClientId(result.data.clients[0].clientId);
  },{});
  const [activeContracts, setActiveContracts] = useState([]);
  const [bills, setBills] = useState([]);
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getContracts/", {
      clientId: 1,
    });
    console.log(result.data.contracts);
    setActiveContracts(result.data.contracts.filter((d)=>(d.status==="active")));
  }, []);
 
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getDrivers/", {
      clientId: 1,
    });
    console.log(result.data.drivers);
    setDrivers(result.data.drivers);
    
  }, []);
  useEffect(async () => {
    const result = await axios.post("http://localhost:6060/getBills/", {
      clientId: 1,
    });
    console.log(result.data.bills);
    setBills(result.data.bills);
  }, []);
    return (
      <div>
        <PageHeader />
        <Sidebar />
        <div className="content-area">
          <div className="tag-name">
            <h4>Dashboard</h4>
          </div>
          <div className=" d-flex flex-row">
            <Card className=" card-tab ml-3 rounded">
              <CardBody>
                <CardTitle>Tài xế</CardTitle>
                <CardSubtitle className="h5">{drivers.length} tài xế</CardSubtitle>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary" href="/client/driver">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Hợp Đồng</CardTitle>
                <CardSubtitle className="h5">{activeContracts.length} hợp đồng</CardSubtitle>
                <CardText>đang có hiệu lực</CardText>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary"  href="/client/contract">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Giao dịch</CardTitle>
                <CardSubtitle className="h5">{bills.length} giao dịch</CardSubtitle>
               
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary"  href="/client/bill">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Thống kê công nợ tài xế</CardTitle>
                
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary"  href="/client/report">
                Xem thêm
              </Button>
            </Card>
          </div>
          <div className="d-flex flex-row">
          <div className="table-container col-5 mt-5 ml-4">
              <h6>Bảng giá xăng dầu</h6>
              <GasPriceTable />
            </div>
            <div className="piechart-container col-5">
              <PieChart className="piechart" />
            </div>
            
          </div>
        </div>
      </div>
    );
  }

