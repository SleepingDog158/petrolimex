import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
export default class Client extends Component {
    render() {
        return (
            <div>
               <Header/>
               <Sidebar/>
               <div className="content">asdasdnas</div>
            </div>
        )
    }
}

