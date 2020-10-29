import React, { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { PaginationComponent } from "./PaginationComponent"
import { Search } from "./Search"
import { FilterAdminBill } from './FilterAdminBill'
import ModalEdit from './ModalAdmin'

export const BillListAdmin = () => {

    const [bills, setBill] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [code, setCode] = useState([]);

    const header = [
        { name: "Mã giao dịch", field: "billId", sortable: true },
        { name: "Tên chi nhánh", field: "station_name", sortable: true },
        { name: "Tên tài xế", field: "driver_name", sortable: true },
        { name: "Tên sản phẩm", field: "product_name", sortable: true },
        { name: "Số lượng", field: "quantity", sortable: false },
        { name: "Thời gian tạo", field: "create_time", sortable: true }
    ];

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getBills/", {});
        console.log(result.data.bills);
        setBill(result.data.bills);
    }, []);

    const billData = useMemo(() => {
        let processedBill = bills;
        if (search) {
            processedBill = processedBill.filter((bill) => 
            bill.code.includes(search) ||
            bill.station_name.toLowerCase().includes(search.toLowerCase()) ||
            bill.driver_name.toLowerCase().includes(search.toLowerCase())
        );
    }
    setTotalItem(processedBill.length);
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        processedBill = processedBill.sort(
            (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
        );
    }
    return processedBill.slice(
        (currentPage - 1) * ITEM_PER_PAGE,
        (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
    );
    }, [bills, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <FilterAdminBill/>
                <Search onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                />
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({field, order})}
                />
                <tbody>
                    {billData.map((bill) => (
                        <tr>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {bill.billId}
                            </td>
                            <td style={{width: "250px", verticalAlign: "middle"}}>
                                {bill.gasStation.name}
                            </td>
                            <td style={{width: "150px", verticalAlign: "middle"}}>
                                {bill.driver.name}
                            </td>
                            <td style={{verticalAlign: "middle"}}>
                                {bill.product.name}
                            </td>
                            <td style={{width: "100px", textAlign: "center", verticalAlign: "middle"}}>
                                {bill.quantity} lít
                            </td>
                            <td style={{width: "180px", textAlign: "center", verticalAlign: "middle"}}>
                                {bill.transactionDate}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <PaginationComponent
                    total={totalItem}
                    itemsPerPage={ITEM_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}
