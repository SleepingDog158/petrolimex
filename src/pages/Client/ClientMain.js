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
export  const ClientMain = () => {
  const [drivers, setDrivers] = useState([]);
  const [activeContracts, setActiveContracts] = useState([]);
  useEffect(async () => {
    const result = await axios.get("https://1ne1c.sse.codesandbox.io/drivers");
    console.log(result.data);
    setDrivers(result.data);
  }, []);
  useEffect(async () => {
    const result = await axios.get(
      "https://1ne1c.sse.codesandbox.io/contracts"
    );
    console.log(result.data);
    setActiveContracts(result.data.filter((d)=> d.status === "active"));
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
              <Button className="w-50 mb-3 ml-3" color="primary" href="/driver">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Hợp Đồng</CardTitle>
                <CardSubtitle className="h5">{activeContracts.length} hợp đồng</CardSubtitle>
                <CardText>đang có hiệu lực</CardText>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary"  href="/contract">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Giao dịch</CardTitle>
                <CardSubtitle className="h5">100 giao dịch</CardSubtitle>
                <CardText>trong 7 ngày</CardText>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary"  href="/bill">
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

