import React, { Component } from 'react'
import NavBar from '../../components/NavBar'

export default class AdminStation extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='admin-station-content'>
                    <h1>Các chi nhánh của công ty</h1>
                    <table>
                        <tr>
                            <th>Tên Chi Nhánh</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian làm việc</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Cửa hàng xăng dầu A</td>
                            <td>Số 3 Tôn Thất Thuyết</td>
                            <td>06:00-22:00</td>
                            <td><button type='button'>Xem chi tiết</button></td>
                        </tr>
                        <tr>
                            <td>Cửa hàng xăng dầu B</td>
                            <td>Số 200 Cầu Giấy</td>
                            <td>05:00-21:00</td>
                            <td><button type='button'>Xem chi tiết</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
