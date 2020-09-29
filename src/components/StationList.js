import React, { useEffect, useMemo, useState, Component } from 'react'
import axios from "axios"
import ModalEdit from "./ModalAdmin"
import Table from "react-bootstrap/Table"
import { TableHeaderAdmin } from "./TableHeaderAdmin"
import { Search } from "./Search"
import { PaginationComponent } from "./PaginationComponent"
import { toast } from 'react-toastify'
import './Admin.css'

export const StationList = () => {

    const [stations, setStation] = useState([]);
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentStation, setCurrentStation] = useState(null);
    const [id, setId] = useState(currentStation ? currentStation.id : "");
    const [station_name, setStationName] = useState(currentStation ? currentStation.station_name : "");
    const [station_address, setStationAddress] = useState(currentStation ? currentStation.station_address : "");
    const [station_working_time, setStationWorkingTime] = useState(currentStation ? currentStation.station_working_time : "");
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)

    const header = [
        { name: "Mã cửa hàng", field: "id", sortable: true },
        { name: "Tên cửa hàng", field: "station_name", sortable: true },
        { name: "Địa chỉ", field: "station_address", sortable: false },
        { name: "Thời gian làm việc", field: "station_working_time", sortable: false },
        { name: "", sortable: false },
    ];

    const toggle = (station) => {
        setModal(!modal);
        if (!modal) {
            setCurrentStation(station);
            setId(station.id);
            setStationName(station.station_name);
            setStationAddress(station.station_address);
            setStationWorkingTime(station.station_working_time);
        }
    };

    const onToggleAdd = () => {
        setAddModal(!addModal);
    };

    const onToggleDelete = (station) => {
        setDeleteModal(!deleteModal);
        if (!modal) {
            setCurrentStation(station);
        }
    };

    function onChangeValue(content, type) {
        switch (type) {
            case "station_name":
                return setStationName(content);
            case "station_address":
                return setStationAddress(content);
            case "station_working_time":
                return setStationWorkingTime(content);
        }
    }

    function onAdd() {
        console.log(id, station_name, station_address, station_working_time);
        toast.success("Đã thêm thông tin chi nhánh!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true});
    }

    function onUpdate() {
        console.log(id, station_name, station_address, station_working_time);
        toast.info("Thay đổi thông tin thành công!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true});
    }

    function onRemove(station) {
        setStation(stations.filter((s) => currentStation.id !== s.id));
        toast.error("Đã xóa thông tin chi nhánh", { position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true });
        console.log(stations);
    }
    
    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/station");
        console.log(result.data);
        setStation(result.data);
    }, []);

    const stationData = useMemo(() => {
        let processedStation = stations;
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
    }, [stations, currentPage, search, sorting]);

    return (
        <div>
            <div>
                <div>
                    <div>
                        <button className="admin-add-button" onClick = {() => onToggleAdd()}>
                            Thêm chi nhánh
                        </button>
                        <Search onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
                        }} />
                    </div>
                    <Table striped>
                        <TableHeaderAdmin
                            header={header}
                            onSorting={(field, order) => setSorting({ field, order })}
                        />
                        <tbody>
                            {stationData.map((station) => (
                                <tr>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {station.id}
                                    </td>
                                    <td style={{width: "280px", verticalAlign: "middle"}}>
                                        {station.station_name}
                                    </td>
                                    <td style={{width: "320px", verticalAlign: "middle"}}>
                                        {station.station_address}
                                    </td>
                                    <td style={{width: "170px", textAlign: "center", verticalAlign: "middle"}}>
                                        {station.station_working_time}
                                    </td>
                                    <td>
                                        <button className="admin-edit-button" onClick = {() => toggle(station)}>
                                            Sửa
                                        </button>
                                        <button className="admin-delete-button" onClick = {() => onToggleDelete(station)}>
                                            Xóa
                                        </button>
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
                            onPageChange={(page) => setCurrentPage(page)} />
                    </div>
                    <ModalEdit modal = {modal} toggle = {toggle} onSubmit = {onUpdate} title = {"Thông tin chi nhánh"}>
                        <Table>
                            <tr>
                                <th>Tên chi nhánh</th>
                                <td>
                                    <input 
                                        defaultValue = {station_name} 
                                        onChange = {(event) => onChangeValue(event.target.value, "station_name")} />
                                </td>
                            </tr>
                            <tr>
                                <th>Địa chỉ</th>
                                <td>
                                    <input
                                        defaultValue = {station_address}
                                        onChange = {(event) => onChangeValue(event.target.value, "station_address")} />
                                </td>
                            </tr>
                            <tr>
                                <th>Thời gian làm việc</th>
                                <td>
                                    <input
                                        defaultValue = {station_working_time}
                                        onChange = {(event) => onChangeValue(event.target.value, "station_working_time")} />
                                </td>
                            </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal = {addModal} toggle = {onToggleAdd} onSubmit = {onAdd} title = {"Thêm chi nhánh"}>
                        <Table>
                            <tr>
                                <th>Tên chi nhánh</th>
                                <td>
                                    <input 
                                        defaultValue = {""} 
                                        onChange = {(event) => onChangeValue(event.target.value, "station_name")} />
                                </td>
                            </tr>
                            <tr>
                                <th>Địa chỉ</th>
                                <td>
                                    <input
                                        defaultValue = {""}
                                        onChange = {(event) => onChangeValue(event.target.value, "station_address")} />
                                </td>
                            </tr>
                            <tr>
                                <th>Thời gian làm việc</th>
                                <td>
                                    <input
                                        defaultValue = {""}
                                        onChange = {(event) => onChangeValue(event.target.value, "station_working_time")} />
                                </td>
                            </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal = {deleteModal} toggle = {onToggleDelete} onSubmit = {onRemove} title = {"Xóa chi nhánh"}>
                        <p>Xóa thông tin chi nhánh?</p>
                    </ModalEdit>
                </div>
            </div>
        </div>
    )
}
