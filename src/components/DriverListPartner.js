import React, { useState, useMemo, useEffect, Component } from 'react'
import axios from "axios"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { PaginationComponent } from './PaginationComponent'
import { Search } from "./Search"

export const DriverListPartner = () => {

    const [driver, setDriver] = useState([]);
    const [driver_id, setId] = useState([]);
    const [driver_name, setName] = useState([]);
    const [driver_phone, setPhone] = useState([]);
    const [driver_plate, setPlate] = useState([]);
    const [driver_team_id, setTeamId] = useState([]);
    const [currentDriver, setCurrentDriver] = useState(null);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEM_PER_PAGE = 10;
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [search, setSearch] = useState("");

    const header = [
        { name: "Mã tài xế", field: "driver_id", sortable: true },
        { name: "Tên tài xế", field: "driver_name", sortable: true },
        { name: "Số điện thoại", field: "driver_phone", sortable: false },
        { name: "Biển kiểm soát", field: "driver_plate", sortable: false },
        { name: "Mã đơn vị", field: "driver_team_id", sortable: true },
        { name: "", sortable: false }
    ];

    useEffect(async () => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/driver");
        console.log(result.data);
        setDriver(result.data);
    }, []);

    const driverData = useMemo(() => {
        let processedDriver = driver;
        if (search) {
            processedDriver = processedDriver.filter((driver) => 
                driver.driver_name.toLowerCase().includes(search.toLowerCase()) ||
                driver.driver_phone.includes(search) ||
                driver.driver_plate.toLowerCase().includes(search.toLowerCase()) ||
                driver.driver_team_id.includes(search)
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
    }, [driver, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <Search onSearch = {(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }} />
            </div>
            <Table striped>
                <TableHeaderAdmin
                    header={header}
                    onSorting={(field, order) => setSorting({ field, order })} />
                <tbody>
                    {driverData.map((driver) => (
                        <tr>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.driver_id}
                            </td>
                            <td style={{width: "300px", verticalAlign: "middle"}}>
                                {driver.driver_name}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.driver_phone}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.driver_plate}
                            </td>
                            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                {driver.driver_team_id}
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
