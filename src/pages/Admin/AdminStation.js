import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import { StationList } from '../../components/StationList'

export default class AdminStation extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='admin-station-content'>
                    <h1>Các chi nhánh của công ty</h1>
                <div><StationList/></div>
                </div>
            </div>
        )
    }
}
