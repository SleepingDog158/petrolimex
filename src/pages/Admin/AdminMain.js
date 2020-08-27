import React, { Component } from 'react'
import NavBar from "../../components/NavBar"

export default class Admin extends Component {
    render() {
        return (
           <div>
               <NavBar/>
               <div class="admin-content">Hello</div>
           </div>
        )
    }
}
