import React, { Component } from 'react'
import GasPriceTable from '../../components/GasPriceTable'
import NavBar from '../../components/NavBar'
import { Navbar } from 'reactstrap'

export default class AdminProduct extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    <h1>Giá xăng dầu hiện tại</h1>
                </div>
                <GasPriceTable/>
            </div>
        )
    }
}
