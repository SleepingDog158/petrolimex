import React, { useEffect, useMemo, useState } from 'react'
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
    const [code, setCode] = useState(currentStation ? currentStation.code : "");
    const [name, setName] = useState(currentStation ? currentStation.name : "");
    const [address, setAddress] = useState(currentStation ? currentStation.address : "");
    const [workingTime, setWorkingTime] = useState(currentStation ? currentStation.workingTime : "");
    const [sorting, setSorting] = useState({ field: "", order: ""});
    const [search, setSearch] = useState("");
    const ITEM_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)

    const header = [
        { name: "Mã cửa hàng", field: "code", sortable: true },
        { name: "Tên cửa hàng", field: "name", sortable: true },
        { name: "Địa chỉ", field: "address", sortable: false },
        { name: "Thời gian làm việc", field: "workingTime", sortable: false },
        { name: "", sortable: false },
    ];

    const toggle = (station) => {
        setModal(!modal);
        if (!modal) {
            setCurrentStation(station);
            setCode(station.code);
            setName(station.name);
            setAddress(station.address);
            setWorkingTime(station.workingTime);
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
            case "code":
                return setCode(content);
            case "name":
                return setName(content);
            case "address":
                return setAddress(content);
            case "workingTime":
                return setWorkingTime(content);
        }
    }

    function onAdd() {
        console.log(code, name, address, workingTime);
        toast.success("Đã thêm thông tin chi nhánh!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    function onUpdate() {
        console.log(code, name, address, workingTime);
        toast.info("Thay đổi thông tin thành công!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    function onRemove(station) {
        setStation(stations.filter((s) => currentStation.code !== s.code));
        toast.error("Đã xóa thông tin chi nhánh", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true
        });
        console.log(stations);
    }
    
    useEffect(async () => {
        const result = await axios.post("http://localhost:6060/getGasStations/", {});
        console.log(result.data.gasStations);
        setStation(result.data.gasStations);
    }, []);

    const stationData = useMemo(() => {
        let processedStation = stations;
        if (search) {
            processedStation = processedStation.filter((station) =>
                station.code.includes(search) || station.name.toLowerCase().includes(search.toLowerCase())
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
                        <button className="admin-add-button" onClick={() => onToggleAdd()}>
                            Thêm chi nhánh
                        </button>
                        <Search onSearch={(value) => {
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
                            {stationData.map((station) => (
                                <tr>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {station.code}
                                    </td>
                                    <td style={{width: "280px", verticalAlign: "middle"}}>
                                        {station.name}
                                    </td>
                                    <td style={{width: "320px", verticalAlign: "middle"}}>
                                        {station.address}
                                    </td>
                                    <td style={{width: "170px", textAlign: "center", verticalAlign: "middle"}}>
                                        {station.workingTime}
                                    </td>
                                    <td style={{width: "150px", textAlign: "right"}}>
                                        <button className="admin-edit-button" onClick={() => toggle(station)}>
                                            Sửa
                                        </button>
                                        <button className="admin-delete-button" onClick={() => onToggleDelete(station)}>
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
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                    <ModalEdit modal={modal} toggle={toggle} onSubmit={onUpdate} title={"Thông tin chi nhánh"}>
                        <Table>
                            <tr>
                                <th>
                                    Mã chi nhánh
                                </th>
                                <td>
                                    <input
                                        defaultValue={code}
                                        onChange={(event) => onChangeValue(event.target.value, "code")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Tên chi nhánh
                                </th>
                                <td>
                                    <input 
                                        defaultValue={name} 
                                        onChange={(event) => onChangeValue(event.target.value, "name")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Địa chỉ
                                </th>
                                <td>
                                    <input
                                        defaultValue={address}
                                        onChange={(event) => onChangeValue(event.target.value, "address")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Thời gian làm việc
                                </th>
                                <td>
                                    <input
                                        defaultValue={workingTime}
                                        onChange={(event) => onChangeValue(event.target.value, "workingTime")}
                                    />
                                </td>
                            </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal={addModal} toggle={onToggleAdd} onSubmit={onAdd} title={"Thêm chi nhánh"}>
                        <Table>
                            <tr>
                                <th>
                                    Mã chi nhánh
                                </th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "code")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Tên chi nhánh
                                </th>
                                <td>
                                    <input 
                                        defaultValue={""} 
                                        onChange={(event) => onChangeValue(event.target.value, "name")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Địa chỉ
                                </th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "address")}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Thời gian làm việc
                                </th>
                                <td>
                                    <input
                                        defaultValue={""}
                                        onChange={(event) => onChangeValue(event.target.value, "workingTime")}
                                    />
                                </td>
                            </tr>
                        </Table>
                    </ModalEdit>
                    <ModalEdit modal={deleteModal} toggle={onToggleDelete} onSubmit={onRemove} title={"Xóa chi nhánh"}>
                        <p>
                            Xóa thông tin chi nhánh?
                        </p>
                    </ModalEdit>
                </div>
            </div>
        </div>
    )
}
