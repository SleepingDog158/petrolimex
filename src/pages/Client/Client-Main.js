import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
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
export default class Client extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="content">
          <div className="tag-name">
            <h4>Dashboard</h4>
          </div>
          <div className=" d-flex flex-row">
            <Card className=" card-tab ml-3 rounded">
              <CardBody>
                <CardTitle>Tài xế</CardTitle>
                <CardSubtitle className="h5">20 tài xế</CardSubtitle>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Hợp Đồng</CardTitle>
                <CardSubtitle className="h5">127 hợp đồng</CardSubtitle>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary">
                Xem thêm
              </Button>
            </Card>
            <Card className="card-tab ml-3">
              <CardBody>
                <CardTitle>Giao dịch</CardTitle>
                <CardSubtitle className="h5">100 giao dịch</CardSubtitle>
                <CardText>trong 7 ngày</CardText>
              </CardBody>
              <Button className="w-50 mb-3 ml-3" color="primary">
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
}
