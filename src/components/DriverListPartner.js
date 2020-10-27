import React, { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { PaginationComponent } from './PaginationComponent'
import { Search } from "./Search"

export const DriverListPartner = () => {

    const [drivers, setDriver] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEM_PER_PAGE = 10;
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");

    const header = [
        { name: "Mã tài xế", field: "code", sortable: true },
        { name: "Tên tài xế", field: "name", sortable: true },
        { name: "Mã công dân", field: "residentId", sortable: false },
        { name: "Số điện thoại", field: "phone", sortable: false },
        { name: "Biển kiểm soát", field: "plate", sortable: false },
        { name: "Nơi ở", field: "address", sortable: false },
        { name: "Trạng thái", field: "status", sortable: true },
        { name: "", sortable: false }
    ];

    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getDrivers/", {});
        console.log(result.data.drivers);
        setDriver(result.data.drivers);
    }, []);

    const driverData = useMemo(() => {
        let processedDriver = drivers;
        if (search) {
            processedDriver = processedDriver.filter((driver) => 
                driver.name.toLowerCase().includes(search.toLowerCase()) ||
                driver.residentId.includes(search) ||
                driver.phone.includes(search) ||
                driver.plate.toLowerCase().includes(search.toLowerCase()) ||
                driver.address.toLowerCase().includes(search.toLowerCase()) ||
                driver.status.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItem(processedDriver.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1: -1;
            processedDriver = processedDriver.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedDriver.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [drivers, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <Search onSearch = {(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                />
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                    {driverData.map((driver) => (
                        <tr>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.code}
                            </td>
                            <td style={{width: "180px", verticalAlign: "middle"}}>
                                {driver.name}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.residentId}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.phone}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.plate}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.address}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <PaginationComponent
                    total={totalItem}
                    itemPerPage={ITEM_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}
