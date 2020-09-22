import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"
import { PaginationComponent } from "./PaginationComponent"
import { Search } from "./Search"
import { FilterAdminBill } from './FilterAdminBill'

export const BillListPartner = () => {

    const [bill, setBill] = useState([]);
    const [bill_id, setId] = useState([]);
    const [station_name, setStationName] = useState([]);
    const [driver_name, setDriverName] = useState([]);
    const [product_name, setProductName] = useState([]);
    const [product_quantity, setProductQuantity] = useState([]);
    const [created_time, setCreatedTime] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    const headers = [
        { name: "ID", field: "bill_id", sortable: true },
        { name: "Tên chi nhánh", field: "station_name", sortable: true },
        { name: "Tên tài xế", field: "driver_name", sortable: true },
        { name: "Tên sản phẩm", field: "product_name", sortable: true },
        { name: "Số lượng", field: "product_quantity", sortable: false },
        { name: "Thời gian tạo", field: "created_time", sortable: true }
    ];

    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/bill");
        console.log(result.data);
        setBill(result.data);
    }, []);

    const billData = useMemo(() => {
        let processedBill = bill;
        if (search) {
            processedBill = processedBill.filter((bill) => 
            bill.bill_id.includes(search) ||
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
    }, [bill, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <FilterAdminBill/>
                <Search onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }} />
            </div>
            <Table striped>
                <TableHeader
                    headers = {headers}
                    onSorting = {(field, order) => setSorting({field, order})} />
                <tbody>
                    {billData.map((bill) => (
                        <tr>
                            <td className="table-center">
                                {bill.bill_id}
                            </td>
                            <td>
                                {bill.station_name}
                            </td>
                            <td>
                                {bill.driver_name}
                            </td>
                            <td>
                                {bill.product_name}
                            </td>
                            <td className="table-center">
                                {bill.product_quantity}
                            </td>
                            <td className="table-center">
                                {bill.created_time}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <PaginationComponent
                    total = {totalItem}
                    itemsPerPage = {ITEM_PER_PAGE}
                    currentPage = {currentPage}
                    onPageChange = {(page) => setCurrentPage(page)} />
            </div>
        </div>
    )
}
