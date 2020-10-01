import React, { Component } from 'react'
import { ProductAdmin } from '../../components/ProductAdmin'
import NavBar from '../../components/NavBar'
import "../../components/Admin.css"
export default class AdminProduct extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="admin-product-content">
                    <h1 className="admin-product-header">Giá xăng dầu hiện tại</h1>
                    <ProductAdmin/>
                </div>
            </div>
        )
    }
}
