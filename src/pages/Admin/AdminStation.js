import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { StationList } from '../../components/StationList'
import "../../components/Admin.css"

export default class AdminStation extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='admin-station-content'>
                    <h1 className="admin-station-header">
                        Các chi nhánh của công ty
                    </h1>
                    <StationList/>
                </div>
            </div>
        )
    }
}
