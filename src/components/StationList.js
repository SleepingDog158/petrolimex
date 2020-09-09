import React, { useEffect, useMemo, useState, Component } from 'react'
import axios from "axios"
import ModalEdit from "./ModalExample"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"

export const StationList = () => {

    const [station, setStation] = useState([]);
    const [modal, setModal] = useState([false]);
    const [id, setId] = useState([]);
    const [currentStation, setCurrentStation] = useState(null);
    const [station_name, setStationName] = useState([]);
    const [station_address, setStationAddress] = useState([]);
    const [station_working_time, setStationWorkingTime] = useState([]);
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Tên cửa hàng", field: "station_name", sortable: true },
        { name: "Địa chỉ", field: "station_address", sortable: false },
        { name: "Thời gian làm việc", field: "station_working_time", sortable: false },
        { name: "", sortable: false },
    ];

    const toggle = (setStation) => {
        setModal(!modal);
        if (!modal) {
            setCurrentStation(station);
            setId(station.id);
            setStationName(station.station_name);
            setStationAddress(station.station_address);
            setStationWorkingTime(station.station_working_time);
        }
    }
    
    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/station");
        console.log(result.data);
        setStation(result.data);
    }, []);

    const stationData = useMemo(() => {
        let processedStation = station;
        if (search) {
            processedStation = processedStation.filter((station) =>
                station.id.includes(search) || station.station_name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItem(processedStation.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            processedStation = processedStation.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return processedStation.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [station, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <div>
                    <div>
                        <Search onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
                        }} />
                    </div>
                    <Table striped>
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {stationData.map((station) => (
                                <tr>
                                    <td>
                                        {station.id}
                                    </td>
                                    <td>
                                        {station.station_name}
                                    </td>
                                    <td>
                                        {station.station_address}
                                    </td>
                                    <td>
                                        {station.station_working_time}
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
                            onPageChange={(page) => setCurrentPage(page)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
