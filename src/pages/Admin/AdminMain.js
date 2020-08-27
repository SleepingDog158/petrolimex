import React, { Component } from 'react'
import NavBar from "../../components/NavBar"
import "./AdminMain.css"

export default class Admin extends Component {
    render() {
        return (
           <div>
               <NavBar/>
               <div class="admin-main-content">Hello</div>
           </div>
        )
    }
}
