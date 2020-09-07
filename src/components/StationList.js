import React, { useEffect, useMemo, useState, Component } from 'react'
import axios from "axios"
import ModalEdit from "./ModalExample"
import { ToastContainer, toast } from "react-toastify"
import Table from "react-bootstrap/Table"
import { TableHeader } from "./TableHeader"

toast.configure()
export const StationList = () => {

    const [station, setStations] = useState([]);
    const [modal, setModal] = useState([false]);
    const [id, setId] = useState([]);
    const [station_name, setStationName] = useState([]);
    const [station_address, setStationAddress] = useState([]);
    const [station_working_time, setStationWorkingTime] = useState([]);

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Tên cửa hàng", field: "station_name", sortable: true },
        { name: "Địa chỉ", field: "station_address", sortable: false },
        { name: "Thời gian làm việc", field: "station_working_time", sortable: false },
        { name: "" },
    ];

    const toggle = (setStation) => {
        setModal(!modal);
        if (!modal) {
            setStation(station);
            setId(station.id);
            setStationName(station.station_name);
            setStationAddress(station.station_address);
            setStationWorkingTime(station.station_working_time);
        }
    }
    
    useEffect(async() => {
        const result = await axios.get("https://tnzio.sse.codesandbox.io/stations");
        console.log(result.data);
        setStations(result.data);
    }, []);

    const stationData = useMemo(() => {
        let processedStation = station;
        return processedStation.slice();
    }, [station]);

    return (
        <div>
            <div>
                <div>
                    <Table striped>
                        <TableHeader
                            headers={headers}
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

                    <ModalEdit
                        modal = {modal}
                        toggle = {toggle}
                        title = {"Thông tin cửa hàng"}
                    >
                    </ModalEdit>
                </div>
            </div>
        </div>
    )
}
