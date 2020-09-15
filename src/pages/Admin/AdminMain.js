import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "../../components/Admin.css"
import GasPriceTable from '../../components/GasPriceTable'

export default class Admin extends Component {
    render() {
        return (
           <div>
               <NavBar/>
               <div className="admin-main-content">
                   <h1 className="admin-main-header">Trang chủ</h1>
                   <div className="admin-main-grid">
                       <div className="admin-main-grid-item1">
                           <h4>Đối tác</h4>
                           <div>60 công ty đối tác<br/>50 có hợp đồng</div>
                           <a href="/partner"><button className="admin-main-grid-button">Xem thêm</button></a>
                       </div>
                       <div className="admin-main-grid-item2">
                           <h4>Hợp đồng</h4>
                           <div>120 hợp đồng<br/>90 đang hoạt động</div>
                           <a href="/contract"><button className="admin-main-grid-button">Xem thêm</button></a>
                       </div>
                       <div className="admin-main-grid-item3">
                           <h4>Chi nhánh</h4>
                           <div>200 chi nhánh<br/>160 đang mở cửa</div>
                           <a href="/station"><button className="admin-main-grid-button">Xem thêm</button></a>
                       </div>
                       <div className="admin-main-grid-item4">
                           <h4>Giao dịch</h4>
                           <div>400 giao dịch<br/>Trong 7 ngày</div>
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
}
