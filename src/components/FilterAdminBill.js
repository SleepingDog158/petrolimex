import React from 'react'
import { UncontrolledCollapse } from 'reactstrap';

export const FilterAdminBill = () => {
    return (
        <div>
            <button id="toggler" className="admin-add-button">
                Bộ lọc
            </button>
            <UncontrolledCollapse toggler="#toggler">
                <table striped>
                    <tr>
                        <td>
                            <input type="select" placeholder="Tên chi nhánh" className="filter-box" />
                        </td>
                        <td>
                            <input type="text" placeholder="Tên tài xế" className="filter-box" />
                        </td>
                        <td>
                            <input type="select" placeholder="Tên sản phẩm" className="filter-box" />
                        </td>
                        <td>
                            Từ ngày:
                            <input type="date" className="filter-box" />
                        </td>
                        <td>
                            Đến ngày:
                            <input type="date" className="filter-box" />
                        </td>
                    </tr>
                </table>
            </UncontrolledCollapse>
        </div>
    )
}
